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
      - id: raw_type
        type: u4
    instances:
      file_type:
        value: raw_type
        enum: file_type
      file_category:
        value: raw_type >> 16
        enum: file_category
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
      is_extension_group:
        value: is_directory and dir_name.substring(0,1) == '.'
      is_tree_termination:
        value: raw_name_size == 0
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
      file_type:
        if: _root.header.data.has_type_mapping_section
        value: _root.type_mapping_section_instance.data.type_mapping_entries[file_index].file_type
      file_category:
        if: _root.header.data.has_type_mapping_section
        value: _root.type_mapping_section_instance.data.type_mapping_entries[file_index].file_category
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
  file_category:
    0x00: interior
    0x01: hud
    0x02: tbd
    0x03: frontend
    0x04: tbd
    0x05: tbd
    0x06: tdu1_database_topic
    0x07: tdu1_database_resources
    0x08: data
    0x09: vehicle
    0x0A: ambient_sound
    0x0B: engine
    0x0E: common_vehicle
    0x15: common_paint
    0xFF: tdumt_reserved
  file_type:
    0x000000: scene_3dd
    0x000001: geometry_3dg
    0x000002: materials_2dm
    0x000003: texture_2db
    0x000007: skeleton_xsb
    0x000008: animation_anm
    0x000009: anim_config_bas
    0x00000B: collisions_shk
    0x000010: cinematic_cin
    0x000011: scenario_sce
    0x010002: materials_2dm
    0x010003: texture_2db
    0x030000: config_vmf
    0x030001: materials_2dm
    0x030002: texture_2db
    0x030004: config_ini
    0x060001: menus_db
    0x060002: rims_db
    0x060003: carrims_db
    0x060004: carphysics_db
    0x060005: interior_db
    0x060006: carcolors_db
    0x060007: brands_db
    0x060008: houses_db
    0x060009: carshops_db
    0x06000A: clothes_db
    0x06000B: hair_db
    0x06000C: tutorials_db
    0x06000D: aftermarketpacks_db
    0x06000E: carpacks_db
    0x06000F: bots_db
    0x060010: achievements_db
    0x060011: pnj_db
    0x060012: subtitles_db
    0x070001: menus_xx
    0x070002: rims_xx
    0x070003: carrims_xx
    0x070004: carphysics_xx
    0x070005: interior_xx
    0x070006: carcolors_xx
    0x070007: brands_xx
    0x070008: houses_xx
    0x070009: carshops_xx
    0x07000A: clothes_xx
    0x07000B: hair_xx
    0x07000C: tutorials_xx
    0x07000D: aftermarketpacks_xx
    0x07000E: carpacks_xx
    0x07000F: bots_xx
    0x070010: achievements_xx
    0x070011: pnj_xx
    0x070012: subtitles_xx
    0x080001: install_data_bin
    0x080002: entities_data_bin
    0x080003: tbd
    0x080004: tbd
    0x080005: zones_data_bin
    0x080006: hashcodes_data_bin
    0x080007: sceneries_data_bin
    0x080008: paths_data_bin
    0x090000: scene_3dd
    0x090001: geometry_3dg
    0x090002: materials_2dm
    0x090003: texture_2db
    0x090004: collision_data_dhk
    0x0A0006: sound_jingle_wav
    0x0B0001: torque_curve_btrq
    0x0B0004: esound_config_xmb
    0x0E0003: texture_2db
    0x150002: materials_2dm
    0xFFFFFFFF: unknown
