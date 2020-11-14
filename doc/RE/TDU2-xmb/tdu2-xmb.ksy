meta:
  id: tdu2_xmb
  file-extension: xmb,cpr
  endian: le
seq:
  - id: magic
    type: str
    size: 8
    encoding: "ascii"
  - id: descriptor_table_addr
    type: u4
  - id: data_start_addr
    type: u4
  - id: data_real_addr
    type: u4
  - id: key_addr
    type: u4
  - id: data_start_real_addr
    type: u4
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
  data_list:
    seq:
      - id: raw_count
        type: u4
      - id: unk
        type: u4
      - id: data_items
        type: data_item
        repeat: expr
        repeat-expr: data_count
    instances:
      data_count:
        value: (raw_count >> 4) & 0x7FF
  data_item:
    seq:
      - id: rel_data_item_addr
        type: u4
      - id: unknown
        type: u4
    instances:
      abs_data_item_addr:
        value: rel_data_item_addr + _root.descriptor_table_addr
      name:
        pos: abs_data_item_addr
        type: strz
        encoding: "ascii"
  string_list:
    seq:
      - id: name
        type: strz
        encoding: "UTF-8"
        repeat: eos
  structure_def:
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
  node_section:
    pos: descriptor_table_addr
    type: node_list
  # structure_section:
  #   pos: structure_section_addr
  #   type: structure_def
  data_section:
    pos: data_start_addr + data_start_real_addr * 4
    type: data_list
