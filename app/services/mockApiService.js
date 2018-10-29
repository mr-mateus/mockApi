'use strict';
const databaseMockDAO = require("../database/databaseMockDAO");
let service = {
    findAllApis: () => {
        return databaseMockDAO.findAll().then(result => {
            return result;
        }).catch(error => {
            return error;
        });
    },
    findApiByMethod: (method) => {
        return databaseMockDAO.findByMethod(method);
    },
    findEndpointByMethodAndURI: (method, uri) => {
        return databaseMockDAO.findEndpointByMethodAndURI(method, uri);
    },
    save: (responseObject) => {
        return databaseMockDAO.save(responseObject);
    },
    deleteAll: () => {
        return databaseMockDAO.deleteAll();
    },
    deletaByMethod: (method) => {
        return databaseMockDAO.deleteByMethod(method);
    },
    deleteByIndexAndMethod: (method, index) => {
        return databaseMockDAO.deleteByIndexAndMethod(method, index);
    }
};

module.exports = service;
