import Product from "../../../domain/product/entity/product";
import ProductUseCase_Update from "./update.product.usecase";

const xxx = new Product("product_id_1","Produto 1 nome [A]", 10)

const g_inputDTO_update = {
    id: xxx.id,
    name: "Produto 1 nome atualizado",
    price: 1010
}

const l_mockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(xxx)),
        update: jest.fn(),
    };
};
    
describe("Update product UseCase Unit test", () => {
    it("should update a product", async () => {
      const l_productRepository = l_mockRepository();
      const l_productUpdateUseCase = new ProductUseCase_Update(l_productRepository);
  
      const l_produtoAtualizado = await l_productUpdateUseCase.execute(g_inputDTO_update);
  
      expect(l_produtoAtualizado).toEqual(g_inputDTO_update);
    });
  });
  
