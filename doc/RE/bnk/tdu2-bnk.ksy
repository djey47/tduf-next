meta:
  id: eden_tdu2_bnk
  file-extension: bnk
  endian: le

seq:
  - id: header
    type: header_section
types:
  header_section:
    seq:
      - id: common
        type: common_data
      - id: data
        type: header_data
        size: common.length
  size_section:
    seq:
      - id: common
        type: common_data
      - id: data
        type: size_data
        size: common.length
  type_mapping_section:
    seq:
      - id: common
        type: common_data
      - id: data
        type: type_mapping_data
        size: common.length
  tree_section:
    seq:
      - id: common
        type: common_data
      - id: data
        type: tree_data
        size: common.length
  header_data:
    seq:
      - id: tag
        type: strz
        size: 12
        encoding: ascii
      - id: flags
        size: 4
      - id: file_size
        type: u4
      - id: packed_size
        type: u4
      - id: block_size
        type: u4
      - id: sixteen
        type: u4
      - id: packed_count
        type: u4
      - id: year
        type: u4
      - id: size_section_addr
        type: u4
      - id: type_mapping_section_addr
        type: u4
      - id: tree_section_addr
        type: u4
      - id: order_section_addr
        type: u4
      - id: magic_section_addr
        type: u4
      - id: packed_section_addr
        type: u4
  size_data:
    seq:
      - id: size_entries
        type: size_entry
        repeat: expr
        repeat-expr: _root.header.data.packed_count
  type_mapping_data:
    seq:
      - id: type_mapping_entries
        type: type_mapping_entry
        repeat: expr
        repeat-expr: _root.header.data.packed_count
  tree_data:
    seq:
      - id: tree_entries
        type: tree_entry
        repeat: eos
  common_data:
    seq:
      - id: length
        type: u4
      - id: checksum
        type: u4
  size_entry:
    seq:
      - id: address
        type: u4
      - id: size
        type: u4
      - id: unknown
        size: 8
      - id: sixteen
        type: u4
  type_mapping_entry:
    seq:
      - id: type
        type: u2
        enum: file_type
      - id: subtype
        type: u2
        enum: file_subtype
  tree_entry:
    seq:
      - id: name_size
        type: s1
      - id: children_count
        type: u1
        if: name_size < 0
      - id: dir_name
        type: str
        encoding: ascii
        size: name_size * -1
        if: name_size < 0
      - id: file_name
        type: str
        encoding: ascii
        size: name_size
        if: name_size >= 0
      
instances:
  size_section_instance:
    pos: header.data.size_section_addr
    type: size_section
  type_mapping_section_instance:
    pos: header.data.type_mapping_section_addr
    type: type_mapping_section
  tree_section_instance:
    pos: header.data.tree_section_addr
    type: tree_section
enums:
  file_type:
    0x0: scene_3dd
    0x1: geometry_3dg
    0x2: materials_2dm
    0x3: texture_2db
    0x4: phy_dhk_xmb
    0xFFFF: other
  file_subtype:
    0x9: car_model
    0xB: binary_data_xmb
    0x15: colors
    0xFFFF: other    