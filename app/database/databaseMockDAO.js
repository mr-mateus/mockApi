'use strict';
const METHOD_GET = "get";
const METHOD_POST = "post";
const METHOD_PUT = "put";
const METHOD_DELETE = "delete";
const messageHelper = require('../helper/messageHelper');
const databaseMockDAO = {
    save: (responseObject) => {
        const responseObjectIsValid = validateResponseObject(responseObject);
        return responseObjectIsValid.then(valid => {
            global.database[responseObject.method][responseObject.path] = responseObject;
            return new Promise((resolve, reject) => {
                return resolve(global.database[responseObject.method][responseObject.path]);
            });
        }).catch(error => {
            return new Promise((resolve, reject) => {
                return reject(error);
            });
        });
    },
    findAll: () => {
        return new Promise((resolve, reject) => {
            let dataBaseResponseObject = {
                get: [],
                put: [],
                post: [],
                delete: []
            };

            for (let pathId in global.database[METHOD_GET]) {
                dataBaseResponseObject.get.push(global.database[METHOD_GET][pathId]);
            }

            for (let pathId in global.database[METHOD_POST]) {
                dataBaseResponseObject.post.push(global.database[METHOD_POST][pathId]);
            }

            for (let pathId in global.database[METHOD_PUT]) {
                dataBaseResponseObject.put.push(global.database[METHOD_PUT][pathId]);
            }

            for (let pathId in global.database[METHOD_DELETE]) {
                dataBaseResponseObject.delete.push(global.database[METHOD_DELETE][pathId]);
            }

            return resolve(dataBaseResponseObject);
        });
    },
    findByMethod: (method) => {
        return validateMethod(method).then(valid => {
            const responseObjects = [];
            for (let pathId in global.database[method]) {
                responseObjects.push(global.database[method][pathId]);
            }
            return new Promise((resolve, reject) => { resolve(responseObjects) });
        }).catch(error => {
            return new Promise((resolve, reject) => {
                return reject(error);
            });
        });
    },
    findEndpointByMethodAndURI: (method, uri) => {
        try {
            const responseObject = global.database[method][uri];
            if (responseObject) {
                return new Promise((resolve, reject) => {
                    resolve(responseObject);
                });
            } else {
                return new Promise((resolve, reject) => {
                    return reject(messageHelper.getMessage("ResponseObject não foi encontrado", "Não foi possível encontrar responseObject pelo método e uri"));
                });
            }
        } catch (error) {
            return new Promise((resolve, reject) => {
                return reject(messageHelper.getMessage("ResponseObject não foi encontrado", "Não foi possível encontrar responseObject pelo método e uri"));
            });
        }
    },
    deleteAll: () => {
        global.database.get = [];
        global.database.put = [];
        global.database.post = [];
        global.database.delete = [];
        return new Promise((resolve, reject) => {
            resolve({ "deleted": deleted });
        });
    },
    deleteByMethod: (method) => {
        return validateMethod(method).then(valid => {
            global.database[method] = [];
            return new Promise((resolve, reject) => { resolve({ deleted: true }) });
        }).catch(error => {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        });
    },
    deleteByIndexAndMethod: (method, index) => {
        try {
            console.log(global.database);
            console.log("method " + method);
            console.log("index " + index);

            delete global.database[method][index];
            // console.log(global.database[method][index]);
            return new Promise((resolve, reject) => {
                resolve({ deleted: true });
            });
        } catch (error) {
            return new Promise((resolve, reject) => {
                return reject(messageHelper.getMessage("ResponseObject não removido", "Não foi possível encontrar o responseObject para remover"));
            });
        }
    }
}

module.exports = databaseMockDAO;

const validateResponseObject = (responseObject) => {
    if (!responseObject) {
        return new Promise((resolve, reject) => {
            return reject(messageHelper.getMessage("Objeto vazio", "O objeto deve preencher as propriedades obrigatórias: path e method"));
        });
    } else if (!responseObject.path) {
        return new Promise((resolve, reject) => {
            return reject(messageHelper.getMessage("Propriedade path undefined", "Propriedade path é obrigatória"));
        });
    } else if (!responseObject.method) {
        return new Promise((resolve, reject) => {
            return reject(messageHelper.getMessage("Propriedade method undefined", "Propriedade method é obrigatória"));
        });
    }
    return new Promise((resolve, reject) => {
        return resolve(true);
    });
};

const validateMethod = (method) => {
    if (!method) {
        return new Promise((resolve, reject) => {
            return reject(messageHelper.getMessage("Método não preenchido", "Método passado deve ser: get,post,put ou delete"));
        });
    }
    switch (method) {
        case "get":
            return new Promise((resolve, reject) => { return resolve(true) });
            break;
        case "post":
            return new Promise((resolve, reject) => { return resolve(true) });
            break;
        case "put":
            return new Promise((resolve, reject) => { return resolve(true) });
            break;
        case "delete":
            return new Promise((resolve, reject) => { return resolve(true) });
            break;
        default:
            return new Promise((resolve, reject) => { reject(messageHelper.getMessage("Método incorreto", "Métodos aceitos são: get,post,put ou delete")) });
            break;
    }
}
