const databaseMockDAO = require("./databaseMockDAO");

describe("databaseMockDAO", () => {
    beforeEach(() => {
        global.database = {};
        global.database.get = [];
        global.database.post = [];
        global.database.put = [];
        global.database.delete = [];
    });

    describe("save", () => {
        test("deve salvar o response do tipo get", () => {
            const getResponseObject = {
                path: "api/user",
                method: "get",
                delay: 0,
                response: {
                    user: {
                        name: "teste",
                        fone: 99999
                    }
                }
            };
            expect(databaseMockDAO.save(getResponseObject)).resolves.toEqual(getResponseObject);
        });

        test("deve retornar um erro informando que a propriedade path é obrigatória", () => {
            const getResponseObject = {
                // "path": "api/user",
                method: "get",
                delay: 0,
                response: {
                    user: {
                        name: "teste",
                        fone: 99999
                    }
                }
            };
            expect(databaseMockDAO.save(getResponseObject)).rejects.toEqual({ "help": "Propriedade path é obrigatória", "message": "Propriedade path undefined" });
        });

        test("deve retornar um erro informando que a propriedade method é obrigatória", () => {
            const getresponseObject = {
                path: "api/user",
                // "method": "get",
                delay: 0,
                response: {
                    user: {
                        name: "teste",
                        fone: 99999
                    }
                }
            };
            expect(databaseMockDAO.save(getresponseObject)).rejects.toEqual({ "help": "Propriedade method é obrigatória", "message": "Propriedade method undefined" });
        });
    });

    describe("findAll", () => {
        test("deve retornar todos os responseObjects", () => {
            const getResponseObject = {
                path: "api/user",
                method: "get",
                delay: 0,
                response: {
                    user: {
                        name: "teste",
                        fone: 99999
                    }
                }
            };
            global.database.get[getResponseObject.path] = getResponseObject;
            let databaseResponseObjectFake = { delete: [], get: [], put: [], post: [] };
            databaseResponseObjectFake.get[getResponseObject.path] = getResponseObject;
            expect(databaseMockDAO.findAll()).resolves.toEqual(databaseResponseObjectFake);
        });
    });

    describe("findByMethod", () => {
        test("deve retornar todos os responseObjects do tipo get", () => {
            const getResponseObject = {
                path: "api/user",
                method: "get",
                delay: 0,
                response: {
                    user: {
                        name: "teste",
                        fone: 99999
                    }
                }
            };
            global.database.get[getResponseObject.path] = getResponseObject;
            const databaseResponseObjectFake = [getResponseObject];
            expect(databaseMockDAO.findByMethod("get")).resolves.toEqual(databaseResponseObjectFake);
        });

        test("deve erro informando que o método deve ser informado", () => {
            expect(databaseMockDAO.findByMethod()).rejects.toEqual({ "help": "Método passado deve ser: get,post,put ou delete", "message": "Método não preenchido" });
        });

        test("deve erro informando que o método está incorreto", () => {
            expect(databaseMockDAO.findByMethod("default")).rejects.toEqual({ "help": "Métodos aceitos são: get,post,put ou delete", "message": "Método incorreto" });
        });
    });

    describe("deleteAll", () => {
        test("deve apagar todos os responseObjects", () => {
            const getResponseObject = {
                path: "api/user",
                method: "get"
            };
            const postResponseObject = {
                path: "api/user",
                method: "post"
            };
            const putResponseObject = {
                path: "api/user",
                method: "put"
            };
            const deleteResponseObject = {
                path: "api/user",
                method: "delete"
            };
            global.database.get[getResponseObject.path] = getResponseObject;
            global.database.get[postResponseObject.path] = postResponseObject;
            global.database.get[putResponseObject.path] = putResponseObject;
            global.database.get[deleteResponseObject.path] = deleteResponseObject;
            databaseMockDAO.deleteAll();
            expect(global.database.get).toEqual([]);
            expect(global.database.post).toEqual([]);
            expect(global.database.put).toEqual([]);
            expect(global.database.delete).toEqual([]);
        });
    });
    
    describe("deleteByMethod", () => {
        let getResponseObject;
        let postResponseObject;
        let putResponseObject;
        let deleteResponseObject;
        beforeEach(() => {
            getResponseObject = {
                path: "api/user",
                method: "get"
            };
            postResponseObject = {
                path: "api/user",
                method: "post"
            };
            putResponseObject = {
                path: "api/user",
                method: "put"
            };
            deleteResponseObject = {
                path: "api/user",
                method: "delete"
            };
            global.database.get[getResponseObject.path] = getResponseObject;
            global.database.post[postResponseObject.path] = postResponseObject;
            global.database.put[putResponseObject.path] = putResponseObject;
            global.database.delete[deleteResponseObject.path] = deleteResponseObject;
        });

        test("deve apagar apenas os responseObjects do método get", () => {
            databaseMockDAO.deleteByMethod("get").then(value => {
                expect(databaseMockDAO.findByMethod("get")).resolves.toEqual([]);
                expect(databaseMockDAO.findByMethod("post")).resolves.not.toEqual([]);
                expect(databaseMockDAO.findByMethod("put")).resolves.not.toEqual([]);
                expect(databaseMockDAO.findByMethod("delete")).resolves.not.toEqual([]);
            });
        });

        test("deve apagar apenas os responseObjects do método post", () => {
            databaseMockDAO.deleteByMethod("post").then(value => {
                expect(databaseMockDAO.findByMethod("get")).resolves.not.toEqual([]);
                expect(databaseMockDAO.findByMethod("post")).resolves.toEqual([]);
                expect(databaseMockDAO.findByMethod("put")).resolves.not.toEqual([]);
                expect(databaseMockDAO.findByMethod("delete")).resolves.not.toEqual([]);
            });
        });
        
        test("deve apagar apenas os responseObjects do método put", () => {
            databaseMockDAO.deleteByMethod("put").then(value => {
                expect(databaseMockDAO.findByMethod("get")).resolves.not.toEqual([]);
                expect(databaseMockDAO.findByMethod("post")).resolves.not.toEqual([]);
                expect(databaseMockDAO.findByMethod("put")).resolves.toEqual([]);
                expect(databaseMockDAO.findByMethod("delete")).resolves.not.toEqual([]);
            });
        });

        test("deve apagar apenas os responseObjects do método delete", () => {
            databaseMockDAO.deleteByMethod("delete").then(value => {
                expect(databaseMockDAO.findByMethod("get")).resolves.not.toEqual([]);
                expect(databaseMockDAO.findByMethod("post")).resolves.not.toEqual([]);
                expect(databaseMockDAO.findByMethod("put")).resolves.not.toEqual([]);
                expect(databaseMockDAO.findByMethod("delete")).resolves.toEqual([]);
            });
        });

        test("deve retornar um erro pois parâmetro method não foi passado", () => {
            expect(databaseMockDAO.deleteByMethod()).rejects.toEqual({ "help": "Método passado deve ser: get,post,put ou delete", "message": "Método não preenchido" });
        });

        test("deve retornar um erro pois parâmetro method foi passado com valor incorreto", () => {
            expect(databaseMockDAO.deleteByMethod("default")).rejects.toEqual({ "help": "Métodos aceitos são: get,post,put ou delete", "message": "Método incorreto" });
        });
    });
});
