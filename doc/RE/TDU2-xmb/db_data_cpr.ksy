meta:
  id: db_data_xmb
  file-extension: cpr
  endian: le
seq:
  - id: magic
    type: str
    size: 8
    encoding: "ascii"
  - id: unk1
    type: u4
  - id: section2_addr
    type: u4
  - id: section2_len
    type: u4
  - id: unk2
    size: 8
  - id: column_names
    type: name_list
  - id: data
    size: 905924
  - id: resources
    type: string_list
  - id: rest
    size-eos: true
types:
  name_list:
    seq:
      - id: name
        type: strz
        # size: 8
        encoding: "ascii"
        repeat: expr
        repeat-expr: 645
  string_list:
    seq:
      - id: name
        type: strz
        encoding: "UTF-8"
        repeat: eos
instances:
  section2:
    size: section2_len
    # size-eos: true
    pos: section2_addr