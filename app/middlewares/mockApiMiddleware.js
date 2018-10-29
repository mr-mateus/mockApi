'use strict';

let mockApiMiddleware = {
    byPass: (req, res, next) => {
        next();
    }
};

module.exports = mockApiMiddleware;
