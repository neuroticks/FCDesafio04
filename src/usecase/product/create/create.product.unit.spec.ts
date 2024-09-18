import CreateProductUseCase from "./create.product.usecase";

const g_input = {
    type: "a",
    name: "Produto nome - tipo A",
    price: 111
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }    
}

describe("product create use case unit tests", () => {
    it("should create a type A product", async () => {
        const l_produtoRepositorio = MockRepository();
        const l_produtoCreateUseCase = new CreateProductUseCase(l_produtoRepositorio);

        const l_output = await l_produtoCreateUseCase.execute(g_input)

        expect(l_output).toEqual({
            id: expect.any(String),
            name: g_input.name,
            price: g_input.price
        })
    })
})