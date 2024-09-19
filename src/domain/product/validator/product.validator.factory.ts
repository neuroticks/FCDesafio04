import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductYupValidator from "./product.yup.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}
// Fato é que já fiz dessa maneira no desafio anterior... 
// então agora fiquei sem saber se voltar no outro desafio e regredir a lógica
// mas vou esperar retornarem a correção.