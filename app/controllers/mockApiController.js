'use strict';

const mockApiService = require("../services/mockApiService");

const controller = {
    findAllApis: async (req, res) => {
        mockApiService.findAllApis().then(response => {
            res.send(response);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    findApiByMethod: (req, res) => {
        mockApiService.findApiByMethod(req.params["method"]).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    findApiByIndexAndMethod: (req, res) => {
        const method = req.params.method;
        const endpoint = req.query.endpoint;
        mockApiService.findEndpointByMethodAndURI(method, endpoint).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    save: (req, res) => { 
        console.log(req.body);       
        mockApiService.save(req.body.object).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    deleteAllApis: (req, res) => {
        mockApiService.deleteAll().then(deleted => {
            res.send(deleted);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    deleteApiByMethod: (req, res) => {
        const method = req.params.method;
        mockApiService.deletaByMethod(method).then(deleted => {
            res.send(deleted);
        }).catch(error => {
            res.status(500).send(error);
        });
    },
    deleteByIndexAndMethod: (req, res) => {
        const method = req.params.method;
        const endpoint = req.query.endpoint;
        mockApiService.deleteByIndexAndMethod(method, endpoint).then(deleted => {
            res.send(deleted);
        }).catch(error => {
            res.status(500).send(error);
        });
    }
};

module.exports = controller;
