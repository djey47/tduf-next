meta:
  id: tdu_pc_1_2_bnk
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
    instances:
      # Little clunky implementation, but still..
      size_entry_length:
        value: common.length / (_root.header.data.packed_count + 1)
      is_for_tdu1:
        value: size_entry_length == 16
      is_for_tdu2:
        value: size_entry_length == 20
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
  order_section:
    seq:
      - id: common
        type: common_data
      - id: data
        type: order_data
        size: common.length
  magic_section:
    seq:
      - id: common
        type: common_data
      - id: data
        type: magic_data
        size: common.length
  packed_section:
    seq:
      - id: packed_entries
        type: packed_entry(_index)
        repeat: expr
        repeat-expr: _root.header.data.packed_count
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
        contents: [0x10, 0x0, 0x0, 0x0]
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
        # Final padding block size info is included - not a real file!
        repeat-expr: _root.header.data.packed_count + 1
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
  order_data:
    seq:
      - id: order_entries
        type: order_entry(_index)
        repeat: eos
  common_data:
    seq:
      - id: length
        type: u4
      - id: checksum
        type: u4
  magic_data:
    seq:
      - id: unk
        type: u4
  size_entry:
    seq:
      - id: address
        type: u4
      - id: size
        type: u4
      # Kind of checksum?
      - id: unknown
        size: 8
      - id: sixteen
        if: _parent._parent.is_for_tdu2
        contents: [0x10, 0x0, 0x0, 0x0]
    instances:
      # Normally, size of padding block should be 0 
      is_packed_file:
        value: size != 0
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
      - id: raw_name_size
        type: s1
      - id: children_count
        if: is_directory
        type: u1
      # Find reason for this... in hud.bnk
      - id: magic
        type: u1
        if: is_directory and children_count >= 176
      - id: dir_name
        if: is_directory
        type: str
        encoding: ascii
        size: raw_name_size * -1
      - id: file_name
        if: is_file
        type: str
        encoding: ascii
        size: raw_name_size
    instances:
      is_directory:
        value: raw_name_size < 0
      is_file:
        value: not is_directory
  order_entry:
    params:
      - id: file_index
        type: u4
    seq:
      - id: tree_filename_index
        type: u1
  packed_entry:
    params:
      - id: file_index
        type: u4
    instances:
      file:
        pos: _root.size_section_instance.data.size_entries[file_index].address
        size: _root.size_section_instance.data.size_entries[file_index].size
              
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
  order_section_instance:
    pos: header.data.order_section_addr
    type: order_section
  magic_section_instance:
    if: header.data.magic_section_addr > 0
    pos: header.data.magic_section_addr
    type: magic_section
  packed_section_instance:
    pos: header.data.packed_section_addr
    type: packed_section
    
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