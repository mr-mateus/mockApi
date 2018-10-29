const mockApiService = require('./mockApiService');
const databaseMockDAO = require('../database/databaseMockDAO');
describe("mockApiService", () => {
    describe("findAllApis ", () => {
        test("deve fazer a chamada do método databaseMockDAO.get()", () => {
            jest.spyOn(databaseMockDAO, "findAll").mockReturnValue(new Promise((resolve, reject) => { resolve({}) }));
            expect(mockApiService.findAllApis()).resolves.toEqual({});
            expect(databaseMockDAO.findAll).toHaveBeenCalled();
        });

    });

    describe("findApiByMethod", () => {
        test("deve fazer a chamada do método getByMethod passando get como parâmetro", () => {
            jest.spyOn(databaseMockDAO, "findByMethod").mockReturnValue(new Promise((resolve, reject) => { resolve({}) }));
            expect(mockApiService.findApiByMethod("get")).resolves.toEqual({});
            expect(databaseMockDAO.findByMethod).toHaveBeenCalledWith("get");
        });
    });

    describe("saveApi", () => {
        test("deve chamar o método save passando o responseObject como parâmetro", () => {
            jest.spyOn(databaseMockDAO, "save").mockReturnValue(new Promise((resolve, reject) => { resolve({}) }));
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
            mockApiService.save(getResponseObject);
            expect(databaseMockDAO.save).toHaveBeenCalledWith(getResponseObject);
        });
    });

    describe("deletAll", () => {
        test("deve chamar o método deleteAll ", () => {
            jest.spyOn(databaseMockDAO, "deleteAll").mockReturnValue(new Promise((resolve, reject) => { resolve({}) }));
            mockApiService.deletaAll();
            expect(databaseMockDAO.deleteAll).toHaveBeenCalled();
        });
    });

    describe("deletByMethod", () => {
        test("deve chamar o método deleteByMethod passando o parâmetro correto ", () => {
            jest.spyOn(databaseMockDAO, "deleteByMethod").mockReturnValue(new Promise((resolve, reject) => { resolve({}) }));
            mockApiService.deletaByMethod("get");
            expect(databaseMockDAO.deleteByMethod).toHaveBeenCalledWith("get");
        });
    });
});
