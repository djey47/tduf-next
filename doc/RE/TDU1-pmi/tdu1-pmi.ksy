meta:
  id: tdu1_pmi
  file-extension: pmi
  endian: le

types:
  entity: # 32 bytes
    seq:
      - id: pos_x
        size: 2
      - id: pos_y
        size: 2
      - id: pos_z
        size: 2
      - id: scale_x
        size: 2 
      - id: scale_y
        size: 2
      - id: scale_z
        size: 2
      - id: rot_x
        size: 2
      - id: rot_y
        size: 2
      - id: rot_z
        size: 2
      - id: unk_x
        size: 2
      - id: unk_y
        size: 2
      - id: unk_z
        size: 2
      - id: display_group
        type: strz
        encoding: ascii
        size: 4
      - id: zeroes
        contents: [0,0,0,0]

  entity_alt: # 128 bytes TODO
    seq:
      - id: unk
        size: 128
        
  asset:
    seq:
      - id: magic_mob
        type: strz
        encoding: ascii
        size: 8
      - id: size1_bytes
        type: u4
      - id: size2_bytes
        type: u4
      - id: entity_name
        type: strz
        encoding: ascii
        size: 8
      - id: entity_count
        type: u2
      - id: entity_type
        type: u2
      - id: unk6
        size: 4
        # contents: [2,0,2,95]
      - id: entities
        type: entity_list
        
  entity_list:
    seq:
      - id: entity_list
        repeat: expr
        repeat-expr: _parent.entity_count
        type:
          switch-on: _parent.entity_type
          cases:
            0: entity
            85: entity_alt
            
  
  asset_list:
    seq:
      - id: asset
        type: asset
        repeat: expr
        repeat-expr: _parent.asset_count

seq:
  - id: unk0
    size: 8
  - id: size_file
    type: u4
  - id: magic
    type: strz
    size: 4
    encoding: ascii
  - id: moba_tag
    type: strz
    size: 4
    encoding: ascii
  - id: unk1
    contents: [0,0,3,0]
  - id: size_without_header
    type: u4
  - id: size_moba
    type: u4
  - id: asset_count
    type: u4
  - id: height_maybe
    type: f4
  - id: height2_maybe
    type: f4
  - id: gap1
    size: 4
    contents: [0xcd, 0xcd, 0xcd, 0xcd]
  - id: unk2
    size: size_moba - 36
  - id: gap2
    size: 4
    contents: [0xcd, 0xcd, 0xcd, 0xcd]
  - id: assets
    type: asset_list
    