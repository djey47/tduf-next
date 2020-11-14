Kaitai Parsers
==============

Here is some script using parser samples, generated from Kaitai Web IDE, running with Kaitai Struct lib.

You'll find most of documentation around here: https://kaitai.io/#what-is-it

## Instructions

- Requirements: v14.4 and higher node installed 
- Set-up: `npm install`
- Init configuration: copy `config/parser-config-root.yaml` to `config/parser-config.yaml` and adjust contents of latter file according to your preference - just need to mention settings you wanna override; root configuration will be used as defaults 
- e.g run sample for TDU2 bank: `npm start <path to BNK file>`.

## Notes

- Use [Kaitai Web IDE](https://ide.kaitai.io/#) to write/amend structures and (re)generate appropriate parser
- Script will try finding parser which fits the most, according to given input file extension; supported parsers are set into the *root* config file
- Generated parser scripts have to be put into *./src/parsers* directory for them to be taken into account
- Structure source location is *(repo root)/RE/...* directory and subs. 
