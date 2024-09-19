import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const l_produto_nome = "Produto Nome Uno"
    const l_produto_preco = 10

    const l_response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: l_produto_nome,
        price: l_produto_preco
      })

    expect(l_response.status).toBe(200)
    expect(l_response.body.name).toBe(l_produto_nome)
    expect(l_response.body.price).toBe(l_produto_preco)
  })

  it("should return an error message when cannot create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Produto Nome One"
      })
    expect(response.status).toBe(500)
  })

  it("should list all products", async () => {
    const l_resp1 = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Produto 1 Nome",
        price: 10
      })
    expect(l_resp1.status).toBe(200)
    const l_resp2 = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "Produto B Nome",
        price: 25
      })
    expect(l_resp2.status).toBe(200)

    const l_respList = await request(app).get("/product").send()
    expect(l_respList.status).toBe(200)

    expect(l_respList.body.products[0]).toStrictEqual({
      id: expect.any(String),
      name: "Produto 1 Nome",
      price: 10
    })
    expect(l_respList.body.products[1]).toStrictEqual({
      id: expect.any(String),
      name: "Produto B Nome",
      price: 50 // porque o Tipo de Produto (B) salva o (preço * 2)
    })
  })
})