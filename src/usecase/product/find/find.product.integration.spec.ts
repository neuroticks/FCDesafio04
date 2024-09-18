import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductUseCase_FindById from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("product find use case integration tests", () => {
    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequileze.addModels([ProductModel]);
        await sequileze.sync();
    });

    afterEach(async () => {
        await sequileze.close();
    });

    it("should return a existing product when search it by ID", async () => {
        // FASE 1 - criação
        const l_productRepository = new ProductRepository();
        // Define qual Repository será acionado por este UseCase
        const l_produtoFindUseCase = new ProductUseCase_FindById(l_productRepository);
        // cria objeto Produto (dominio)
        const l_produto1 = new Product("produto_id_1", "Produto 1 nome", 111)
        // persiste objeto produto no BD através do Repository pré-definido
        await l_productRepository.create(l_produto1)

        // FASE 2 - busca
        // procura o produto recém criado através do UseCase
        const l_inputDTO = { id: l_produto1.id }
        // recebe o produtoEncontrado já no formato do OutputDTO
        const l_produtoEncontrado = await l_produtoFindUseCase.execute(l_inputDTO)
        
        // FASE 3 - conferência
        // confere valores do 
        // produto inicialmente criado diretamente com o Repository
        // com o produto encontrado pelo UseCase
        expect(l_produtoEncontrado).toEqual({
            id: l_produto1.id,
            name: l_produto1.name,
            price: l_produto1.price
        })
    })

    it("should return an error when product not found", async () => {
        // FASE 1 - busca 
        // define a mensagem que deve ser exibida ao não encontrar produto com id informado
        const l_errorMsg = "Product not found"
        // define o Repository
        const l_productRepository = new ProductRepository();
        // Define qual Repository será acionado por este UseCase
        const l_produtoFindUseCase = new ProductUseCase_FindById(l_productRepository);
        // Não preciso criar pois vou procurar por um id que não existe
        const l_inputDTO = { id: "produto_id_1" }
        
        // confere que ao procurar pelo produto com id que não existe,
        // retornará a mensagem de erro pré-definida
        expect(() => {
            return l_produtoFindUseCase.execute(l_inputDTO)
        }).rejects.toThrow(l_errorMsg)
    })

})