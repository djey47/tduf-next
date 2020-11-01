meta:
  id: eden_tdu1_2db_variant
  file-extension: 2db
  endian: le
  
seq:
  - id: file_hdr
    type: file_header
  - id: image_data
    size: eos
types:
  file_header:
    seq:
      - id: file_version
        type: u2
      - id: unk1
        type: u2
      - id: unk2
        type: u4
      - id: size
        type: u4
      - id: id1
        size: 4
      - id: id2
        size: 4        
      - id: unk3
        type: u2
      - id: unk4
        type: u2
      - id: some_size
        type: u4          
      - id: some_other_size
        type: u4
      - id: param_8
        type: u4
      - id: param_8_2
        type: u4
      - id: width
        type: u2
      - id: height
        type: u2
      - id: param_4
        type: u2
      - id: param_5 #mipmaps
        type: u1
      - id: unk5 #format?
        type: u1
      - id: param_7
        type: u4
      - id: unk6
        type: u4
      - id: unk7
        type: u4
      - id: param_6
        type: u4
      - id: unk8
        type: u1
      - id: uvar2
        type: u2