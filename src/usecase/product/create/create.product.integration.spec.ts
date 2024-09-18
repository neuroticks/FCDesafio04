import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "./create.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const g_inputDTO = {
    type: "a",
    name: "Produto nome - tipo A",
    price: 111
};

describe("product create use case integration tests", () => {
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

    it("should create a type A product", async () => {
        const l_productRepository = new ProductRepository();
        // Define qual Repository será acionado por este UseCase
        const l_produtoCreateUseCase = new CreateProductUseCase(l_productRepository);
        // UseCase executa a "criação" destes dados (g_inputDTO)=(DTO)
        // no BD através do Repository pré-definido
        const l_outputDTO = await l_produtoCreateUseCase.execute(g_inputDTO)

        // então para conferência da integração UseCase<->Repository<->Model
        // vou consultar os dados através do Model
        const l_produtoIdPesquisa = l_outputDTO.id
        const l_produtoEncontrado = await ProductModel.findOne({ where: { id: l_produtoIdPesquisa } })
        
        expect(l_outputDTO).toEqual({
            id: l_produtoEncontrado.getDataValue("id"),
            name: l_produtoEncontrado.getDataValue("name"),
            price: l_produtoEncontrado.getDataValue("price"),
        })
    })
})