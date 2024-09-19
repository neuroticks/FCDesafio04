import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductUseCase_ListAll from "./list.product.usecase";

describe("listing all products use case integration tests", () => {
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
    
    it("should list all products", async () => {
        // FASE 1 - criação
        const l_productRepository = new ProductRepository();
        // Define qual Repository será acionado por este UseCase
        const l_produtoFindAllUseCase = new ProductUseCase_ListAll(l_productRepository);
        // cria objeto Produto (dominio)
        const l_produto1 = new Product("produto_id_1", "Produto 1 nome", 111)
        const l_produto2 = new Product("produto_id_2", "Produto 2 nome", 222)
        const l_produto3 = new Product("produto_id_3", "Produto 3 nome", 333)
        // persiste objeto produto no BD através do Repository pré-definido
        await l_productRepository.create(l_produto1)
        await l_productRepository.create(l_produto2)
        await l_productRepository.create(l_produto3)

        // FASE 2 - busca
        const l_produtosEncontrados = await l_produtoFindAllUseCase.execute({})
        
        // FASE 3 - conferência
        // confere valores do 
        // produto inicialmente criado diretamente com o Repository
        // com o produto encontrado pelo UseCase
        expect(l_produtosEncontrados.products.length).toBe(3)

        expect(l_produtosEncontrados.products[0]).toEqual({
            id: l_produto1.id,
            name: l_produto1.name,
            price: l_produto1.price
        })
        
        expect(l_produtosEncontrados.products[2]).toEqual({
            id: l_produto3.id,
            name: l_produto3.name,
            price: l_produto3.price
        })
    })
    
    it("should return empty when none products found", async () => {
        // FASE 1 - busca 
        // define o Repository
        const l_productRepository = new ProductRepository();
        // Define qual Repository será acionado por este UseCase
        const l_produtoFindAllUseCase = new ProductUseCase_ListAll(l_productRepository);
        
        // FASE 2 - busca
        const l_produtosEncontrados = await l_produtoFindAllUseCase.execute({})

        // FASE 3 - conferência
        expect(l_produtosEncontrados.products.length).toBe(0)
    })

})