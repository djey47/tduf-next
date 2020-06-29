/** Operation dictionary */

const { start: startGame } = require('./game');
const { start: startDatabaseEditor } = require('./database-editor');
const { bankinfo } = require('./file');

const operations = {
    file: {
        bankinfo,
    },
    game: {
        start: startGame,
    },
    databaseEditor: {
        start: startDatabaseEditor,
    },
};

module.exports = operations;
