/** game executable operations */

const path = require('path');
const childProcess = require('child_process');
const serverConfig = require('../config').get();

function start(args) {
    const { switches } = args;

    const gameExecutable = path.resolve(serverConfig.tdu.gamePath, 'TestDriveUnlimited.exe');

    console.info('(i) Attempting to start game', { gameExecutable } );

    const switchesForCommand = switches ? switches.join(' ') : '';

    childProcess.exec(`${gameExecutable} ${switchesForCommand}`, err => {
        if (err) {
            console.error('(!) Could not run game', { err });
            // TODO push notification to web
        } else {
            console.info('(i) Game finished running');
            // TODO push notification to web
        }
    });
}

function clearRadial() {

}

module.exports = {
    clearRadial,
    start,
}
