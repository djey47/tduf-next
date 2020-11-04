meta:
  id: db_data_xmb
  file-extension: cpr
  endian: le
seq:
  - id: magic
    type: str
    size: 8
    encoding: "ascii"
  - id: section1_addr
    type: u4
  - id: section2_addr
    type: u4
  - id: string_offset
    type: u4
  - id: unk2
    size: 8
  - id: nodes_section
    type: node_list
  - id: data
    size: 905922
  - id: strings
    type: string_list
  - id: rest
    size-eos: true
types:
  node_list:
    seq:
      - id: nodes
        type: strz
        encoding: "ascii"
        repeat: expr
        repeat-expr: 645
      - id: padding
        size: 5
  string_list:
    seq:
      - id: name
        type: strz
        encoding: "UTF-8"
        repeat: eos
  section2:
    seq:
      - id: unk1
        size: 8
      - id: structure
        repeat: expr
        repeat-expr: 736
        type: structure_entry
      - id: unk2
        size: 8
  structure_entry:
    seq:
      - id: v1
        type: u4
      - id: v2
        type: u4
instances:
  section1:
    pos: section1_addr
    type: node_list
  section2:
    pos: section2_addr
    type: section2
