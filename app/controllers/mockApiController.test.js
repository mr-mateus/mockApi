const mockApiController = require("./mockApiController");
const mockApiService = require("../services/mockApiService");
const req = {};
const res = {
    send: () => { },
    status: (method) => { return res; }
};

describe("mockApiController", () => {
    test("findAllApis deve chamar o método findAllApis do objeto mockApiService  e o método res.send com o objeto de retorno", async () => {
        const responseObject = { nome: "lucas" };
        jest.spyOn(mockApiService, "findAllApis").mockReturnValue(new Promise((resolve, reject) => { resolve(responseObject) }));
        jest.spyOn(res, "send");
        await mockApiController.findAllApis(req, res);
        expect(res.send).toHaveBeenCalledWith(responseObject);
    });

    test("findAllApis deve chamar o método findAllApis do objeto mockApiService  e o método res.send com o objeto de retorno", async () => {
        const responseObject = { nome: "lucas" };
        jest.spyOn(mockApiService, "findAllApis").mockReturnValue(new Promise((resolve, reject) => { reject(responseObject) }));
        jest.spyOn(res, "send");
        await mockApiController.findAllApis(req, res);
    });

    // test("findAllApis deve chamar o método findAllApis do objeto mockApiService e lançar uma exceção", async () => {
    //     expect.assertions(1);
    //     jest.spyOn(mockApiService, "findAllApis").mockReturnValue(new Promise((resolve, reject) => { reject({}) }));
    //     jest.spyOn(res, "send");
    //     // jest.spyOn(res, "status").mockReturnThis((method) => { return res });
    //     await mockApiController.findAllApis(req, res);
    //         console.log("CARALHA");

    //     expect(res.send).not.toHaveBeenCalled();
    //     // expect(res.status).toHaveBeenCalledWith(500);
    // });
});
