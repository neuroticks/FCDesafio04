import express, { Request, Response } from "express"
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase"
import ProductRepository from "../../product/repository/sequelize/product.repository"
import ProductUseCase_ListAll from "../../../usecase/product/list/list.product.usecase"

export const productRoute = express.Router()

productRoute.post("/", async (req: Request, res: Response) => {
    const l_productCreateUseCase = new CreateProductUseCase(new ProductRepository())
    
    try {
        const l_inProdutoDTO_create = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        }

        const l_outProdutoDTO_create = await l_productCreateUseCase.execute(l_inProdutoDTO_create)
        res.send(l_outProdutoDTO_create)

    } catch (err) {
        res.status(500).send(err)
    }
})

productRoute.get("/", async (req: Request, res: Response) => {
    const l_productListUseCase = new ProductUseCase_ListAll(new ProductRepository())

    const l_outProdutoDTO_listAll = await l_productListUseCase.execute({})
    res.send(l_outProdutoDTO_listAll)
})