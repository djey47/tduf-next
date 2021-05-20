BNK FORMAT SPECIFICATION
========================

TDU Banks for TDU1/TDU2, consider them as zip files without compression. However, format seems to be designed to host metadata for TDU game engine (optimization goals?).

# Structure
cf. *tdu-bnk.ksy* file as kaitai struct format for details.

## General layout

It follows same principles for each section:

- One header part, with always same structure (except for packed data one which does not get header). Header hosts size of data part and a checksum.
- One data part.

## Section list

Known sections are below, in order:

- general header
- sizes: kind of index
- type mapping (optional)
- tree: directory and file hierarchy
- order: maps tree to index
- magic (optional): TBD
- packed data

### Common info header (8 bytes)

- section data size as 4 bytes, unsigned integer
- section checksum as 4 bytes, unsigned integer, that is first complement of `CRC32(dataBytes[])`

Game behaviour remains to be tested when putting wrong checksum for a section.

### Padding string (WTF)

Every section and packed file end with a special, repeatable, padding string `STNICC2000 RULEZPADDING DATAS...-ORIC AND ATARI--COOL  MACHINES-`. Is this kind of alignment to improve file reading speed?

It seems to be truncatable/replaceable though, but that has not been widely tested. Current TDUMT2 writer implementation does replace it btw ;)

So necessary padding is calculated to satisfy a total length (data + padding) multiple of a block size.

**In-between section padding**
Every section + padding seem to have size multiple of *section* `blockSize` item in general header data. 

**In-between packed files padding**
Every packed file + padding seem to have size multiple of *packed file* `blockSize` item in general header data.


# Interesting notes

## Limitations

- Maximum packed file count per directory: 255

## Differences between TDU1/TDU2

Light diff, but still. That's in file sizes section, which gives start address of each packed file and its length.

For each entry, TDU2 engine requires 20 bytes whereas TDU1's uses 16 bytes. Those 4 additional bytes are a `0x10` constant value as unsigned integer. Is this a desperate attempt in making TDU1 tools incompatible? :p

To determine weither selected BNK is for TDU1 or TDU2, we'll thus check indirectly by using following formula: `file size data / (packed file count + 1)` (2 values which are available in general header data section). The '+1' allows to take into account a fake file size entry, which is meant to describe a padding zone, located right after the last real file. Theorically, this padding zone could have a zero length.

## Weird 0x1 byte!

File tree section: in some cases, a byte is present next to entry count in a directory, with value `0x1`. Whereas current reader implementations just detect this byte and do ignore it, the game seems to complain if it's not present after rewriting. The meaning of this byte is unclear, still.

e.g 0x[FC C1 01 2E 32 64 62]  <=> ü Á  . 2 d b
- 0xFC: -4, so packed directory with name length = 4
- 0xC1: 193 packed files in that directory
- 0x01: weird byte!
- 0x[2E .. 62]: directory name is '.2db'.

Known files:
- Euro\Bnk\FrontEnd\HiRes\hud.bnk, 176 packed files
- Euro\Bnk\FrontEnd\HiRes\hud_cha.bnk, 193 packed files.

For now, TDUMT implementation at writing will put a 0x1 when file count >= 176 - which is far from ideal solution...
