const fs = require("fs");
const Path = require('path');
const KaitaiStream = require('kaitai-struct/KaitaiStream');
const { load: loadConfig } = require('./src/helpers/config');

// Loading conf
const config = loadConfig();
const { currentGame, games } = config;
const currentGameConfig = games[currentGame];
console.log('Current game:', currentGame);

// Validating input
const [,,inputFile] = process.argv;
if (!inputFile) {
    console.error("You must specify an input file to parse as argument (as absolute path, or relative path to game root directory)");
    process.exit(1);
}
const absoluteInputFile = Path.isAbsolute(inputFile) ?
    inputFile : Path.join(currentGameConfig.rootDirectory, inputFile );
console.log({absoluteInputFile});
if (!fs.existsSync(absoluteInputFile)) {
    console.error("Input file not found!", absoluteInputFile);
    process.exit(1);
}

// Finding suitable parser
const { parsers: parserConfig } = currentGameConfig;
const matchingParserEntry = Object.entries(parserConfig)
    .find(([extension]) => absoluteInputFile.toUpperCase().endsWith(extension.toUpperCase()));
if (!matchingParserEntry) {
    const supportedExtensions = Object.values(parserConfig);
    console.error("Could not find appropriate parser", { supportedExtensions });
    process.exit(1);
}
const [,matchingParser] = matchingParserEntry;
console.log("Found appropriate parser:", matchingParser);

// Loading file to parse
const ParserClass = require(`./src/parsers/${matchingParser}`);
const fileContents = fs.readFileSync(absoluteInputFile);
const parsed = new ParserClass(new KaitaiStream(fileContents));

// Displaying some info
console.log({parsed});
