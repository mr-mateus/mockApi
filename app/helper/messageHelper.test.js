const messsageHelper = require("./messageHelper");

describe("messageHelper", () => {
    test("getMessage um objeto com as propriedades preenchidas", () => {
        expect(messsageHelper.getMessage("erro","um erro ocorreu")).toEqual({
            message: "erro",
            help: "um erro ocorreu"
        });    
    });
});
