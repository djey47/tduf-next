/* eslint-disable no-console */
/** Console helper */

const emo = require('node-emoji');
require('colors');

/**
 * Console info with emoji support
 * @param {String} message 
 * @param  {...any} objects 
 */
function info(message, ...objects) {
    console.log(emo.emojify(`\n${':information_source:'.blue} ${message}`), ...objects);
}

/**
 * Console error with emoji support
 * @param {String} message 
 * @param  {...any} objects 
 */
function error(message, ...objects) {
    console.error(emo.emojify(`\n:x: ${message}`), ...objects);
}

module.exports = {
    info,
    error,
};
