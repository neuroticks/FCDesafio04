import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    private la_productRepository: ProductRepositoryInterface

    constructor( par_productRepository: ProductRepositoryInterface){
        this.la_productRepository = par_productRepository
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto>{
        const l_produto = ProductFactory.create(
            input.type,
            input.name,
            input.price
        )

        await this.la_productRepository.create(l_produto);

        return {
            id: l_produto.id,
            name: l_produto.name,
            price: l_produto.price
        }
    }
}