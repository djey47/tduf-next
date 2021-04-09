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
        repeat-until: _ == ''  # Padding - 2 last items must be ignored
  metadata:
    seq:
      - id: type_defs
        type: type_def
        repeat: expr
        repeat-expr: _parent.number_of_types
  type_def:
    seq:
      - id: packed_type_info
        type: u4    
      - id: name_string_offset
        type: u4
      - id: keys
        type: key_def
        repeat: expr
        repeat-expr: number_of_keys        
    instances:
      type_name_abs_addr:
        value: _root.descriptor_table_addr + name_string_offset
      number_of_keys:
        value: packed_type_info >> 4 & 0x7FF
      primitive_type_id:
        enum: data_type
        value: packed_type_info & 0xFF
      private_len:
       value: packed_type_info >> 0x10
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
        enum: special_marker
    instances:
      key_name_abs_addr:
        value: _root.descriptor_table_addr + name_string_offset
      key_type_abs_addr:
        value: _root.metadata_addr + 4 * type_offset        
      # Kaitai does not allow parsing into a different stream, sadly...
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
  data_section:
    # Data section layout depends on object contents so can't be described here...
    # Manual parsing has to be performed here, see README.md file for details
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
  special_marker:
    0: object
    128: array
