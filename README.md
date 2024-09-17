# FCDesafio04
Módulo: Clean Architecture

Desafio 1: UseCases para Product
    
    Da mesma forma que fizemos a criação dos use cases realizando as operações: "create", "find", "list", "update" para "Customer", faça:
        
    * Crie as operações mencionadas acima para nossa entidade: "Product".
    * Implemente os testes de unidade e integração nos quatro use cases.


Desafio 2: API de Products
    
    Da mesma forma que fizemos a listagem dos nossos Customers em nossa API, repita o mesmo processo e realize a listagem de Products. Realize o teste automatizado end-to-end.

Desafio 3: Notification Pattern em Products

    Aprendemos que o notification pattern nos auxilia como um container acumulador de erros para que possamos de uma forma mais simples retornar nossos erros todos de uma vez evitando assim geração numerosa de exceções.

    Nesse desafio você deverá utilizar o padrão notification em nossa entidade Products. Lembre de realizar os testes automatizados.

    Adicione um teste que acumule dois erros ao mesmo tempo.

Desafio 4: Validação de Products

    Agora que aprendemos a criar o processo de validação, bem como minimizar o acoplamento em nosso domínio, você deverá realizar o processo de validação na entidade Product seguindo o mesmo processo.

    OBS: Verificar se todos os testes ainda estão passando.

* A linguagem de programação para este desafio é TypeScript