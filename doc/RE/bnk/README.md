BNK FORMAT SPECIFICATION
========================

TDU Banks for TDU1/TDU2, consider them as zip files without compression. However, format seems to be designed to host metadata for TDU game engine (optimisation goals?).

# Structure

cf. *tdu-bnk.ksy* file as kaitai struct format.

## General layout

It follows same principles for each section:

- One header part, with always same structure (except for packed data one which does not get header). Header hosts size of data part and a checksum (CRC-32 First complement) of data part
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




# Interesting notes

## Padding string

WTF... Every section and packed file end with a special, repeatable, padding string `STNICC2000 RULEZPADDING DATAS...-ORIC AND ATARI--COOL  MACHINES-`. Is this kind of alignment to improve file reading speed?

It seems to be truncatable/replaceable though, but that has not been widely tested. Current TDUMT2 writer implementation does replace it btw ;)

### In-between section padding
TBD

### In-between packed files padding
TBD


## Section checksum

Game behaviour remains to be tested when putting wrong checksum for a section.

## Differences between TDU1/TDU2

Light diff, but still. That's in file sizes section, which gives start address of each packed file and its length.

For each entry, TDU2 need 20 bytes whereas TDU1 uses 16 bytes. Those 4 additional bytes are a `0x10` constant value  as unsigned integer. Is this a desperate attempt in making TDU1 tools incompatible? :p

To determine weither selected BNK is for TDU1 or TDU2, we'll thus check indirectly by using following formula: `file size data / (packed file count + 1)` (2 values which are available in general header data section). The '+1' allows to take into account a fake file size entry, which is meant to describe a padding

## Weird byte

In file tree section: in some cases, a byte has been inserted next to entry count in a directory, with value `0x1`. Whereas current reader implementations just detect this byte and do ignore it, the game seems to complain if it's not present after rewriting.
