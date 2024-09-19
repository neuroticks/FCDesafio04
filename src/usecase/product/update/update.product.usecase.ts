import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class ProductUseCase_Update {
  private la_productRepository: ProductRepositoryInterface

  constructor(par_productRepository: ProductRepositoryInterface) {
    this.la_productRepository = par_productRepository;
  }

  async execute(input: InputUpdateProductDto): 
                    Promise<OutputUpdateProductDto> {
    const l_productFound = await this.la_productRepository.find(input.id)
    const l_produto = l_productFound as Product

    l_produto.changeName(input.name)
    l_produto.changePrice(input.price)
    await this.la_productRepository.update(l_produto)
    
    //const l_produtoModel = await ProductModel.findOne({ where: { id: input.id } });
    // return {
    //     id: l_produtoModel.dataValues.id,
    //     name: l_produtoModel.dataValues.name,
    //     price: l_produtoModel.dataValues.price
    // }
    
    const l_productUpdated =  await this.la_productRepository.find(input.id)
    return {
        id: l_productUpdated.id,
        name: l_productUpdated.name,
        price: l_productUpdated.price
    }
  }
}
