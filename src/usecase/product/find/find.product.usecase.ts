import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class ProductUseCase_FindById {
    private la_productRepository: ProductRepositoryInterface

    constructor( par_productRepository: ProductRepositoryInterface){
        this.la_productRepository = par_productRepository
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto>{
        const l_produtoEncontrado = await this.la_productRepository.find(input.id);

        return {
            id: l_produtoEncontrado.id,
            name: l_produtoEncontrado.name,
            price: l_produtoEncontrado.price
        }
    }
}