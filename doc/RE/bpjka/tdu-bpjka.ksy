meta:
  id: tdu2_bpjka
  file-extension: bpjka
  endian: le
seq:
  - id: tag
    type: str
    size: 20
    encoding: "ascii"
  - id: unk1
    size: 108
    type: section_1
  - id: unk2
    type: section_1
    size-eos: true
types:
  section_1:
    seq:
      - id: value
        type: f4
        repeat: eos
