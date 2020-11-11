const fs = require("fs");
const { inspect } = require('util');
const KaitaiStream = require('kaitai-struct/KaitaiStream');
const Tdu2Bnk = require('./Tdu2Bnk');

const [,,inputFile] = process.argv;

if (!inputFile) {
    console.error("You must specify an input file to parse as argument");
    process.exit(1);
}

console.log({inputFile});

const fileContents = fs.readFileSync(inputFile);
const parsed = new Tdu2Bnk(new KaitaiStream(fileContents));

console.log({parsed});
console.log({ sizeSectionInstance: inspect(parsed.sizeSectionInstance.data) });
