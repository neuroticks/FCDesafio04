import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductUseCase_ListAll from "./list.product.usecase";

const g_produto1 = ProductFactory.create("a", "Produto 1 nome [A]", 11)
const g_produto2 = ProductFactory.create("b", "Produto 2 nome [B]", 22)

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([g_produto1, g_produto2])),
    }
}

describe("listing all products use case unit tests", () => {
    it("should list all products", async () => {
        const l_productRepository = MockRepository();
        const l_listaProdutosUseCase = new ProductUseCase_ListAll(l_productRepository)

        const l_outputDTO_FindAll = await l_listaProdutosUseCase.execute({})

        expect(l_outputDTO_FindAll.products.length).toBe(2)

        expect(l_outputDTO_FindAll.products[0]).toStrictEqual({
            id: g_produto1.id,
            name: g_produto1.name,
            price: g_produto1.price
        })
        expect(l_outputDTO_FindAll.products[1]).toStrictEqual({
            id: g_produto2.id,
            name: g_produto2.name,
            price: g_produto2.price
        })
    })

    it("should return empty if not found any products", async () => {
        const l_MockRepository = () => {
            return {
                create: jest.fn(),
                find: jest.fn(),
                update: jest.fn(),
                findAll: jest.fn().mockReturnValue(Promise.resolve()),
            }
        }
        const l_productRepository = l_MockRepository();
        const l_listaProdutosUseCase = new ProductUseCase_ListAll(l_productRepository)

        const l_outputDTO_FindAll = await l_listaProdutosUseCase.execute({})

        expect(l_outputDTO_FindAll.products.length).toBe(0)
    })
})