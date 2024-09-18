import Product from "../../../domain/product/entity/product";
import ProductUseCase_FindById from "./find.product.usecase";

const g_produto1 = new Product("produto_id_1", "Produto nome 1", 111)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(g_produto1)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("product find use case unit tests", () => {
    it("should return a existing product when search it by ID", async () => {
        const l_produtoRepositorio = MockRepository();
        const l_produtoFindUseCase = new ProductUseCase_FindById(l_produtoRepositorio);

        const l_inputDTO = { id: g_produto1.id }

        const l_produtoEncontrado = await l_produtoFindUseCase.execute(l_inputDTO)

        const g_outputDTO_comoDeveSer = {
            id: g_produto1.id,
            name: g_produto1.name,
            price: g_produto1.price
        }

        expect(l_produtoEncontrado).toEqual(g_outputDTO_comoDeveSer)
    })

    it("should return an error when product not found", async () => {
        // simula o Repository usando Mock
        const l_produtoRepositorio = MockRepository();
        // simula a resposta de Erro ao procurar um Product
        const l_errorMsg = "Produto não encontrado."
        l_produtoRepositorio.find.mockImplementation(()=>{
            throw new Error(l_errorMsg)
        })

        // define o UseCase com o Falso Repository
        const l_produtoFindUseCase = new ProductUseCase_FindById(l_produtoRepositorio);

        // define o DTO de procura com id que não existe
        const l_inputDTO = { id: "id_not_exist" }

        // confere que ao procurar pelo produto com id que não existe,
        // retornará a mensagem de erro pré-definida
        expect(() => {
            return l_produtoFindUseCase.execute(l_inputDTO)
        }).rejects.toThrow(l_errorMsg)
    })
})