'use strict';
const mockApiService = require('./mockApiService');
let service = {
    requestHandler: (req, res) => {
        const method = req.method.toLowerCase();
        const uri = req.url;
        mockApiService.findEndpointByMethodAndURI(method, uri).then(responseObject => {
            const status = responseObject.status ? responseObject.status : 200;
            res.status(status);
            res.send(responseObject.response);
        }).catch(error => {
            res.status(404);
            res.send(error);
        });
    }
};

module.exports = service;
