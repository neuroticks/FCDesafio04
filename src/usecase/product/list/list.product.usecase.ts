import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ProductUseCase_ListAll {
    private la_productRepository: ProductRepositoryInterface

    constructor(par_productRepository: ProductRepositoryInterface) {
        this.la_productRepository = par_productRepository
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const l_produtosEncontrados = await this.la_productRepository.findAll();

        return OutputProductMapper.toOutput(l_produtosEncontrados)
    }

}

class OutputProductMapper {
    static toOutput(par_products: ProductInterface[]): OutputListProductDto {
        if (par_products === undefined) {
            return {
                products: []
            }
        }

        return {
            products: par_products.map((prod) => ({
                id: prod.id,
                name: prod.name,
                price: prod.price

            }))
        }
    }
}