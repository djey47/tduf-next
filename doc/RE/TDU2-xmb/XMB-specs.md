XMB FILE FORMAT SPECIFICATIONS
==============================

## What is XMB ?
Not sure if XMB stands for 'XML as binary form', this format exists as of TDU1 (2005-ish); it was mainly used for engine sound configuration. Since TDU2 development, format was used for much more cases, especially game database. TDU1 and TDU2 game engines seem to rely on same format specs (to be refined still).

XMB allows to store data with hierarchy: objects, arrays are supported, as well as primitive and custom types. Thus providing a generic way to store all kind of game information.

## Encryption support
Files may be encrypted, in this case use TDUdec tool (originally written by Luigi Auriemma) with non-savegame mode. Actually both TDU1 and TDU2 share the same encryption keys.

## XMB structure
see `tdu2-xmb.ksy` definition file. XMB byte order is low-endian, on PC platform that is.

### Header (28 bytes)
This section contains format tag (4 ASCII chars) + a magic value (4 bytes)

, as well as 3 address pointers of 4 bytes each:
- Descriptor table section
- Metadata section
- Data section

, and 2 offsets of 4 bytes each :
- Key offset: when added to descriptor table address, will point to the first key (root)
- Number of types : actually multiplied by 2

More details about those 3 sections are given below.

### Descriptor table (variable)
This section is a list of all names used in the object tree, including:
- object and array names
- primitive value names
- type names

This section starts at address given in header above; that is **0x1C** (28) as previous contents won't ever change.

List layout is simply names on ISO-8859-2 encoding, each name ending with ASCII-0 character. Padding is used after the last string, using 0x41 ('A') character until the next section address is met (metadata).

Notes: 
- name ordering does not seem to have any importance here, thus relying on addresses later
- may contain types which are not even used in this file...
- is meant to be used by metadata section below.

### Metadata
This section hosts many categories, in following order:

**All type definitions**

Relying on 4 bytes per type

TODO

**All object keys**

Relative (to metadata) address of this category is computed via formula `number of types * 4`, to skip type definition category. 

It contains :
- number of object key names, extracted from 4 byte integer value, right shifted 4 times then with bitwise AND applied 0x7FF mask (basically divided by 16).
- unknown value (4 byte integer)
- for each object key :
    - offset (4 byte integer) in descriptor table to get the key name
    - type offset (1 byte)
    - padding (2 bytes)
    - array marker (1 byte)

Internal type address is then computed via formula: `metadata section address + 4 * type offset`. Found value at this address having bitwise AND applied 0xF mask, that gives value of the internal type (see Appendix below).


### Data

TODO

## Appendix

### Commonly used types

With Min and max values when applicable:

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
- (13) ARRAY: C-style string (ending with \0)
- (?) VIRTUAL
