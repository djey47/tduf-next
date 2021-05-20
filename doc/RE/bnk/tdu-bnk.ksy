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
      - id: section_block_size
        type: u4
      - id: file_block_size
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
    instances:
      has_type_mapping_section: 
        value: type_mapping_section_addr > 0
      has_magic_section: 
        value: magic_section_addr > 0
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
        type: type_mapping_entry(_index)
        repeat: expr
        repeat-expr: _root.header.data.packed_count
        # if: _root.header.data.has_type_mapping_section
  tree_data:
    seq:
      - id: tree_entries
        type: tree_entry
        repeat: eos
  order_data:
    seq:
      - id: order_entries
        type: order_entry
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
    params:
      - id: file_index
        type: u4  
    seq:
      - id: type
        type: u4
        enum: file_type
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
    seq:
      - id: tree_file_index
        type: u1
        type:
          switch-on: _root.header.data.packedCount < 256
          cases:
            true: u1
            false: u2
  packed_entry:
    params:
      - id: file_index
        type: u4
    instances:
      file_bytes:
        pos: _root.size_section_instance.data.size_entries[file_index].address
        size: _root.size_section_instance.data.size_entries[file_index].size
      type:
        if: _root.header.data.has_type_mapping_section
        value: _root.type_mapping_section_instance.data.type_mapping_entries[file_index].type
      size_bytes:
        value: _root.size_section_instance.data.size_entries[file_index].size
      tree_index:
        value: _root.order_section_instance.data.order_entries[file_index].tree_file_index
      # WIP - unreliable for now...
      # Tree index should consider only packed file entries in the tree section data
      # ,thus not including folders or extension groups
      # Ideally, a processor should filter those entries and get extension group.
      # Name should be retrieved thanks to it
      # name:
      #   value: _root.tree_section_instance.data.tree_entries[tree_index].file_name
              
instances:
  size_section_instance:
    pos: header.data.size_section_addr
    type: size_section
  type_mapping_section_instance:
    if: header.data.has_type_mapping_section
    pos: header.data.type_mapping_section_addr
    type: type_mapping_section
  tree_section_instance:
    pos: header.data.tree_section_addr
    type: tree_section
  order_section_instance:
    pos: header.data.order_section_addr
    type: order_section
  magic_section_instance:
    if: header.data.has_magic_section
    pos: header.data.magic_section_addr
    type: magic_section
  packed_section_instance:
    pos: header.data.packed_section_addr
    type: packed_section
    
enums:
  file_type:
    0x000000: interior_scene_3dd
    0x000001: interior_geometry_3dg
    0x000002: interior_materials_2dm
    0x000003: interior_texture_2db
    0x000007: interior_skeleton_xsb
    0x000008: interior_animation_anm
    0x000009: interior_anim_config_bas
    0x00000B: interior_collisions_shk
    0x000010: interior_cinematic_cin
    0x000011: interior_scenario_sce
    0x010002: hud_materials_2dm
    0x010003: hud_texture_2db
    0x030000: frontend_config_vmf
    0x030001: frontend_materials_2dm
    0x030002: frontend_texture_2db
    0x030004: frontend_config_ini
    0x060001: tdu1_database_topic_menus_db
    0x060002: tdu1_database_topic_rims_db
    0x060003: tdu1_database_topic_carrims_db
    0x060004: tdu1_database_topic_carphysics_db
    0x060005: tdu1_database_topic__db
    0x060006: tdu1_database_topic__db
    0x060007: tdu1_database_topic__db
    0x060008: tdu1_database_topic__db
    0x060009: tdu1_database_topic__db
    0x06000A: tdu1_database_topic__db
    0x06000B: tdu1_database_topic__db
    0x06000C: tdu1_database_topic__db
    0x06000D: tdu1_database_topic__db
    0x06000E: tdu1_database_topic__db
    0x06000F: tdu1_database_topic__db
    0x060010: tdu1_database_topic__db
    0x060011: tdu1_database_topic__db
    0x060012: tdu1_database_topic__db
    0x070001: tdu1_database_resource_menus
    0x070002: tdu1_database_resource_rims
    0x070003: tdu1_database_resource_carrims
    0x070004: tdu1_database_resource_carphysics
    0x080001: install_data_bin
    0x080002: entities_data_bin
    0x080003: tbd_data_bin
    0x080005: zones_data_bin
    0x080006: hashcodes_data_bin
    0x080007: sceneries_data_bin
    0x080008: paths_data_bin
    0x090000: vehicle_scene_3dd
    0x090001: vehicle_geometry_3dg
    0x090002: vehicle_materials_2dm
    0x090003: vehicle_texture_2db
    0x090004: vehicle_collision_data_dhk
    0x0A0006: sound_jingle_wav
    0x0B0001: engine_torque_curve_btrq
    0x0B0004: engine_sound_config_xmb
    0x150002: paint_materials_2dm
    0xFFFFFFFF: tdumt_unknown
