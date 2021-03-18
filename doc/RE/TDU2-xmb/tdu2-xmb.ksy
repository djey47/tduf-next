meta:
  id: tdu2_xmb
  file-extension: xmb,cpr
  endian: le
seq:
  - id: tag
    type: str
    size: 4
    encoding: "ascii"
  - id: version
    type: u4
  - id: descriptor_table_addr
    type: u4
  - id: metadata_addr
    type: u4
  - id: subobject_table_addr
    type: u4
  - id: key_offset
    type: u4
  - id: number_of_types
    type: u4
  - id: rest
    size-eos: true
types:
  name_list:
    seq:
      - id: names
        type: strz
        encoding: "ascii"
        repeat: until
        repeat-until: _ == 'AA'
  metadata:
    seq:
      - id: zero
        type: u4
      - id: type_defs
        type: type_def
        repeat: expr
        repeat-expr: _parent.number_of_types
    instances:
      key_defs:
        pos: _parent.number_of_types * 4
        type: key_defs
  type_def:
    seq:
      - id: type_id
        type: u1
      - id: type_size
        type: u2
      - id: padding
        type: u1
      - id: rest
        size: 4
  key_defs:
    seq:
       - id: header
         type: key_def_header
       - id: keys
         type: key_def
         repeat: expr
         repeat-expr: header.number_of_keys
  key_def_header:
    seq:
      - id: raw_key_info
        type: u4
      - id: unknown
        type: u4
    instances:
      number_of_keys:
        value: raw_key_info >> 4 & 0x7FF
  key_def:
    seq:
      - id: name_string_offset
        type: u4
      - id: type_offset
        type: u1
      - id: padding
        type: u2
      - id: array_marker
        type: u1
    instances:
      key_name_abs_addr:
        value: _root.descriptor_table_addr + name_string_offset
      # key_name:
      #   pos: _root.descriptor_table_addr + name_string_offset
      #   type: str
      #   size: 4
      #   encoding: 'ascii'
instances:
  descriptor_table_section:
    pos: descriptor_table_addr
    type: name_list
  metadata_section:
    pos: metadata_addr
    type: metadata
    size-eos: true
  data_section:
    pos: subobject_table_addr
    size-eos: true
