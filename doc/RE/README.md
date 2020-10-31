# Reverse Engineering

This section hosts all notes taken while attempting to reverse engineer TDU files.

You'll also find file format structures in various forms, mostly under Kaitai Struct YAML (.ksy files).

* [[Spots / POI: SPT|Reverse-Engineering-Spots]]
* [[Graphics: 2DM|Reverse-Engineering-2DM]]
* [[Useful info and resources|TDU-Useful-Resources]]

# App development ideas (obsolete)

* Converter: TDUF structure file (*.map.json) to HexWorkshop structure definition (in library.hsl) => see http://www.hexworkshop.com/onlinehelp/600/html/idhelp_structure_libraries.htm
* Front-end: Map with coordinates finder: select, search ...
  * displaying areas and sectors
  * displaying enabled spots with filter ...
* Front-end: to apply mini patches (*.json) to TDU install
  * Drag and drop of patch(es) from file explorer
  * Compressed database or bnk snapshot before changes