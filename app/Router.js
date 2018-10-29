'use strict';

let mockApiMiddleware = require('./middlewares/mockApiMiddleware');

module.exports = [
  {
    path: '/mochApi',
    middleware: [mockApiMiddleware.byPass],
    handler: require('./routes/mockApiRoute')
  }
];
