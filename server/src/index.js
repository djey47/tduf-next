const express = require('express');
const path = require('path');
const opn = require('opn');
const appRootDir = require('app-root-dir').get();
const packageInfo = require(path.join(appRootDir, 'package.json'));
const serverConfig = require('./helpers/config').get();
const { init: initServices } = require('./services/common');
const initCoreServices = require('./services/core');
const initToolsServices = require('./services/tools');
const { info } = require('./helpers/console');

const WEBAPP_PATH = '/';

function main(args) {
    info('TDUF.next server', packageInfo.version, { args });

    if (process.env.MODE_DEV) {
      info(':sleuth_or_spy: DEV mode enabled!');
    }

    info(':gear:  Loaded',{ serverConfig });

    const app = express();
  
    // Webapp: this will enable you to serve files to /
    app.use(WEBAPP_PATH, express.static(
      path.resolve(appRootDir, serverConfig.gui.relativePath),
      { index: "index.html" },
    ));

    // Services
    initServices(app);
    initCoreServices(app, serverConfig);
    initToolsServices(app, serverConfig);

    // Server starter
    const port = serverConfig.server.port || 2020;
    app.listen(port, () => {
      const guiUrl = `http://localhost:${port}/`;
      info(':rocket: Server listening', { guiUrl });
      info(':keyboard:  CTRL+C will terminate server');

      if (serverConfig.gui.open === true) {
        opn(guiUrl);
      }

    });    
}

main(process.argv);
