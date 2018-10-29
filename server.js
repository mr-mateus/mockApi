'use strict';

require('./utils/autoload')();
let config = require('./config.json');

let express = require('express');
const cors = require('cors');
let http = require('http');
let PORT = process.env.PORT || config.port || 3000;
let Router = autoload('app/Router');

const dynamicResponseService = require('./app/services/dynamicResponseService');
let app = express();

let server = http.createServer(app);
require('./app/database/databaseMock');
/* MIDDLEWARE */
require('./config/middleware')(app, express);

app.use(cors());

/* ROUTES */
Router.forEach(route => {
  app.use(route.path, route.middleware, route.handler);
});

app.use((req, res, next) => {
  dynamicResponseService.requestHandler(req, res);
});


/* START SERVER */
server.listen(PORT);
console.log('Server ' + config.name + ' is running ' + ' started on 127.0.0.1:' + PORT + '\n');

