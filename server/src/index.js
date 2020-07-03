const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const opn = require('opn');
const appRootDir = require('app-root-dir').get();
const packageInfo = require(path.join(appRootDir, 'package.json'));
const serverConfig = require('./config').get();
const operations = require('./ops/operations');
const { info } = require('./helpers/console');

function main(args) {
    // TODO Logging mechanism: winston?

    // Java fix
    process.env.PATH = `${process.env.PATH}:${serverConfig.java.jrePath}`;

    info('TDUF.next server', packageInfo.version, { args });

    if (process.env.MODE_DEV) {
      info(':sleuth_or_spy: DEV mode enabled!');
    }

    info(':gear:  Loaded',{ serverConfig });

    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    //This will enable you to serve files to /tools
    app.use('/', express.static(path.resolve(appRootDir, serverConfig.gui.relativePath), { index: "index.html" }));

    app.get('/tools/:category/:operation', (req, res) => {
      const { path,  params } = req;
      info(':dark_sunglasses:  Call with', { path, params });
      res.send(`${params.category} - ${params.operation}`);  
    });    
    
    app.get('/configuration', (req, res) => {
      res.contentType('application/json');
      
      const { path,  params } = req;
      info(':dark_sunglasses:  Call with', { path, params });
      res.send(serverConfig);  
    });
    
    app.post('/tools/:category/:operation', (req, res) => {
      res.contentType('application/json');

      const { path,  params, body } = req;

      info(':dark_sunglasses:  Call with', { path, params, body });

      if (!operations[params.category] || !operations[params.category][params.operation]) {
        res.statusCode = 404;
        res.send({
          errors: [
            `Category - Operation combination not found: ${params.category} - ${params.operation}`,
          ],
        });
      } else {
        try {
          const op = operations[params.category][params.operation];
          const result = op(body.args);
    
          res.statusCode = 200;
          res.send({
            result,
            errors: [],
          });

        } catch (error) {
          res.statusCode = 400;
          res.send({
            errors: [ error.stderr.toString() ],
          });
        }  
      }
    });
    
    const port = serverConfig.server.port || 2020;
    app.listen(port, () => {
      info(':rocket: Server listening', { port });

      if (serverConfig.gui.open === true) {
        opn(`http://localhost:${port}/`);
      }

    });    
}

main(process.argv);
