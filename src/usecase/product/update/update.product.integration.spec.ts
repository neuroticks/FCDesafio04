import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductUseCase_Update from "./update.product.usecase";

describe("Update product UseCase Integration test", () => {
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

    it("should update a product", async () => {
        // FASE 1 - criação
        const l_productRepository = new ProductRepository();
        // Define qual Repository será acionado por este UseCase
        const l_produtoUpdateUseCase = new ProductUseCase_Update(l_productRepository);
        // cria objeto Produto (dominio)
        const l_produto1 = new Product("produto_id_1", "Produto 1 nome", 111)
        // persiste objeto produto no BD através do Repository pré-definido
        await l_productRepository.create(l_produto1)

        // FASE 2 - modifica
        // modifica a entidade de dominio
        l_produto1.changeName("Produto 1 com nome atualizado")
        l_produto1.changePrice(1010)
        const l_inputDTO_update = { 
            id: l_produto1.id,
            name: l_produto1.name,
            price: l_produto1.price
        }
        // atualiza produto1 inicialmente incluido no DB pelo Repository,
        // recebendo o produto atualizado no DB no formato outputDTO_update
        const l_produtoAtualizado = await l_produtoUpdateUseCase.execute(l_inputDTO_update)

        // FASE 3 - conferência
        // confere valores do 
        // domainEntity Produto inicialmente criado diretamente com o Repository e atualizado localmente
        // com o produto atualizado pelo UseCase
        expect(l_produtoAtualizado).toEqual({
            id: l_produto1.id,
            name: l_produto1.name,
            price: l_produto1.price
        })
    })

})