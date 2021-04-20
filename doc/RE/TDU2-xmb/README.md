XMB FILE FORMAT SPECIFICATIONS
==============================

## What is XMB ?
Not sure if XMB stands for 'XML as binary form', this format exists as of TDU1 (2005-ish); it was mainly used for engine sound configuration. Since TDU2 development, format was used for much more cases, especially game database. TDU1 and TDU2 game engines seem to rely on same format specs (to be refined still).

XMB allows to store data with hierarchy: objects, arrays are supported, as well as primitive and custom types. Thus providing a generic way to store all kind of game information.

Current state of the project leads to a decompiled reader (based on game machine code), which actually works. Though, a writer routine remains to be implemented.

## Encryption support
Files may be encrypted, in this case use TDUdec tool (originally written by Luigi Auriemma) with non-savegame mode. Actually both TDU1 and TDU2 share the same encryption keys.

## XMB structure
see `tdu2-xmb.ksy` definition file. XMB byte order is low-endian, on PC platform that is.

### Header (28 bytes)

| Offset | Type   | Size (bytes) | Comment                       |
|--------|--------|--------------|-------------------------------|
| 0x0    | STRING | 4            | Format TAG                    |
| 0x4    | UINT   | 4            | Version?                      |
| 0x8    | UINT   | 4            | Descriptor table address      |
| 0xC    | UINT   | 4            | Metadata address              |
| 0x10   | UINT   | 4            | Subobject data table address  |
| 0x14   | UINT   | 4            | Root key name offset          |
| 0x18   | UINT   | 4            | Number of types (x2)          |

This section contains format tag (4 ASCII chars) + a magic value (4 bytes)

, as well as 3 address pointers of 4 bytes each (aka UINT32):
- Descriptor table section
- Metadata section
- Data section

, and 2 offsets of 4 bytes each :
- Key offset: when added to descriptor table address, will point to the first key (root)
- Number of types (raw) : to get actual number, just divide it by 2

More details about those 3 sections are given below.

### Descriptor table (variable length)

This section is a list of all names used in the object tree, including:
- object and array names
- primitive value names
- type names

This section starts at address given in header above; that is **0x1C** (28) as previous contents won't ever change.

List layout is simply names on ISO-8859-2 encoding, each name ending with ASCII-0 character. Padding is used after the last string, using padding as **0x41** ('A') until the next section address is met (metadata).

Notes: 
- name ordering does not seem to have any importance here, thus relying on addresses later
- may contain types which are not even used in this file. As a consequence we hope writing the only necessary names is sufficient (not tested yet)
- it is meant to be used by metadata section below.

### Metadata (variable length)
This section hosts all type definitions (primitives, complex, arrays). It's a repetition (number of types read above) of following simplified structure:

| Offset (relative)                   | Type  | Size (bytes) | Comment                                         |
|-------------------------------------|-------|--------------|-------------------------------------------------|
| 0x0                                 | UINT  | 4            | Type information (packed)                       |
| 0x4                                 | UINT  | 4            | Name offset in descriptor table                 |
| 0x8                                 | BYTES | ?            | Repetition of key def structure                 |

Packed type information hosts many details:
- Number of keys: calculated via formula `packed_type_info >> 4 & 0x7FF`
- Type id: `packed_type_info & 0xFF` (check result in available types appendix)
- Private length: `packed_type_info >> 0x10` (not used)
- Other packed info is still unknown.

In case of complex objects, key definitions are also added. Purpose of this block is to describe the keys for all objects by pointing to descriptor and metadata table (for name and type, respectively). Following structure repeats for each available key:

| Offset (relative) | Type | Size (bytes) | Comment                         |
|-------------------|------|--------------|---------------------------------|
| 0x0               | UINT | 4            | Name offset in descriptor table |
| 0x4               | BYTE | 1            | Type offset in metadata         |
| 0x5               | BYTE | 2            | Padding with zeroes             |
| 0x7               | BYTE | 1            | Array marker                    |

*Note: array marker is set to **0x80** if the key points to an array, 0 otherwise*

Absolute type address is finally computed via formula: `metadata section address + 4 * type offset`; that points to either a type def (for primitive) or key def (for sub object).

### Data (variable length)

We'll find here all node values as primitives and array information. This starts at `subobject table address`. Items are stored inline, depending of the index in the key list of current object. There's no separator between values, so data type must be known to read it accordingly. For more information, refer to hex table illustration in **Data section hex.png** file (see illustrations in appendix).

Reading values is pretty different between objects and array cases.

**Objects**

Primitive type is fetched from metadata section. Primitive values are stored inline. If object contains an array, contained values are not here, special info is written instead :

| Offset (relative) | Type | Size (bytes) | Comment                 |
|-------------------|------|--------------|-------------------------|
| 0x0               | UINT | 4            | Array length            |
| 0x4               | UINT | 4            | Array start offset      |

Thus, values contained in array must be read following indirection: at address `data table start + array start offset`.

Concerning strings, there's nothing particular here; values are inlined with the classic ISO-8859-2 encoding, terminated with the ASCII \0 character.

**Arrays**

Content type is fetched from metadata section. Array values are stored inline, starting at start offset read in the parent object.

There's no evidence of "array of array" existence in game files for now.

**Additional data**

Remaining contents are still unknown, it represents a huge part in the data section! 

The game might accept the file without it, hopefully.

## Appendix

### Commonly used types

(type id) With Min and max values when applicable:

- (0) OBJECT
- (1) BOOL: 1 bit (0..1)
- (2) SINT8: 1 byte signed (-128..127)
- (3) SINT16: 2 bytes signed (-32768..32767)
- (4) SINT32: 4 bytes signed (-2147483648..2147483647)
- (5) SINT64: 8 bytes signed (-9223372036854775808..9223372036854775807)
- (6) UINT8: 1 byte unsigned (0..255)
- (7) UINT16: 2 bytes unsigned (0..65535)
- (8) UINT32: 4 bytes unsigned (0..4294967295)
- (9) UINT64: 8 bytes unsigned (0..18446744073709551615)
- (10) FLOAT: 4 bytes floating-point
- (11) DOUBLE: 8 bytes floating-point
- (12) STRING: C-style string (ending with \0)
- (13) ARRAY: hosts many items of a same type
- (?) VIRTUAL: role has not been determined yet
- (x) OTHER: custom types.


### Illustrations

**Data section hex**

![Data section hex](https://github.com/djey47/tduf-next/raw/master/doc/RE/TDU2-xmb/data-section-hex.png)
