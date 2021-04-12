# Reverse Engineering

This section hosts all notes taken while attempting to reverse engineer TDU files.

You'll also find file format structures in various forms, mostly under Kaitai Struct YAML (.ksy files).

# IDE configuration (vscode)
Allows to handle R/W of Kaitai structure definitions.
## Plugins
- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)
- [kaitai struct vscode](https://marketplace.visualstudio.com/items?itemName=fudgepops.kaitai-struct-vscode) (beta)
## Settings
```json
"files.associations": {
  "*.ksy": "yaml"
},
"yaml.schemas": {
  "https://raw.githubusercontent.com/kaitai-io/ksy_schema/master/ksy_schema.json": "*.ksy"
}, 
```

# App development ideas

* Converter: TDUF structure file (-map.json) to Kaitai structure definition => see http://doc.kaitai.io/ksy_diagram.html
