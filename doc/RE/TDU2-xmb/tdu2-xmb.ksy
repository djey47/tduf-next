meta:
  id: tdu2_xmb
  file-extension: xmb,cpr
  endian: le
seq:
  - id: tag
    type: str
    size: 4
    encoding: "ascii"
  - id: version # Unsure
    type: u4
  - id: descriptor_table_addr
    type: u4
  - id: metadata_addr
    type: u4
  - id: subobject_table_addr
    type: u4
  - id: key_offset
    type: u4
  - id: number_of_types_raw
    type: u4
types:
  name_list:
    seq:
      - id: names
        type: strz
        encoding: ASCII
        repeat: until
        repeat-until: _ == ''  # Padding
  metadata:
    seq:
      - id: type_defs
        type: type_def
        repeat: expr
        repeat-expr: _parent.number_of_types
    instances:
      object_defs:
        pos : _parent.number_of_types_raw * 4
        type: object_defs
        size : _parent.subobject_table_addr - _parent.metadata_addr - _parent.number_of_types_raw * 4
  type_def:
    seq:
      - id: packed_type_id_len
        type: u4
      - id: name_string_offset
        type: u4
    instances:
      type_id:
        enum: data_type
        value: packed_type_id_len & 0xFF
      private_len:
        value: packed_type_id_len >> 0x10
  object_defs:
    seq:
      - id: def
        type: object_def
        repeat: eos
  object_def:
    seq:
       - id: header
         type: object_def_header
       - id: keys
         type: key_def
         repeat: expr
         repeat-expr: header.number_of_keys
  object_def_header:
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
  number_of_types:
    value: number_of_types_raw / 2
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
enums:
  data_type:
    0: object
    1: bool
    2: s_int_8
    3: s_int_16
    4: s_int_32
    5: s_int_64
    6: u_int_8
    7: u_int_16
    8: u_int_32
    9: u_int_64
    10: float
    11: double
    12: string
    13: array
