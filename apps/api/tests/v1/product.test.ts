import Lab from "@hapi/lab";
import { expect } from "@hapi/code";
const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());

import { Server } from "@hapi/hapi";
import { db } from "../../src/config/database";
import { serverInit } from "../../src/lib/hapi";
import products from "./products";

describe("GET /", () => {
  let server: Server;

  beforeEach(async () => {
    await db("products").del();
    await db("products").insert(products);
    server = await serverInit();
  });

  afterEach(async () => {
    await server.stop();
  });

  it("responds with 200", async () => {
    const res = await server.inject({
      method: "get",
      url: "/api/v1/products",
    });
    expect(res.statusCode).to.equal(200);
  });

  it("Should list products max 10", async () => {
    const res = await server.inject({
      method: "get",
      url: "/api/v1/products",
    });

    expect(res.statusCode).to.equal(200);

    const json = JSON.parse(res.payload);
    const { products } = json;

    expect(products.length).to.equal(10);
    expect(products[0]).to.include("id");
    expect(products[0]).to.include("name");
    expect(products[0]).to.include("price");
    expect(products[0]).to.include("imageSrc");
  });

  it("Should get the total count of products", async () => {
    const res = await server.inject({
      method: "get",
      url: "/api/v1/products",
    });

    expect(res.statusCode).to.equal(200);

    const json = JSON.parse(res.payload);
    const { totalCountProducts } = json;

    expect(totalCountProducts).to.equal(products.length);
  });

  it("Should list products max 2", async () => {
    const res = await server.inject({
      method: "get",
      url: "/api/v1/products?limit=2",
    });

    expect(res.statusCode).to.equal(200);

    const json = JSON.parse(res.payload);
    const { products } = json;

    expect(products.length).to.equal(2);
    expect(products[0]).to.include("id");
    expect(products[0]).to.include("name");
    expect(products[0]).to.include("price");
    expect(products[0]).to.include("imageSrc");
  });

  it("Should list products max 2 from second page", async () => {
    const product = products[2];
    const res = await server.inject({
      method: "get",
      url: "/api/v1/products?limit=2&skip=2",
    });

    expect(res.statusCode).to.equal(200);

    const json = JSON.parse(res.payload);
    const { products: prod } = json;

    expect(prod.length).to.equal(2);
    expect(prod[0]).to.include("id");
    expect(prod[0]).to.include("name");
    expect(prod[0]).to.include("price");
    expect(prod[0]).to.include("imageSrc");
    expect(prod[0].id).to.equal(product.id);
    expect(prod[0].name).to.equal(product.name);
    expect(prod[0].price).to.equal(product.price);
    expect(prod[0].imageSrc).to.equal(product.imageSrc);
  });

  it("Should fetch products filtered by id", async () => {
    const productsId = [products[0].id, products[3].id, products[6].id];
    const res = await server.inject({
      method: "GET",
      url: `/api/v1/products?ids=${productsId.join(",")}`,
    });

    expect(res.statusCode).to.equal(200);

    const json = JSON.parse(res.payload);
    const { products: prod } = json;

    expect(prod.length).to.equal(3);
    expect(productsId).to.contains(prod[0].id);
    expect(productsId).to.contain(prod[1].id);
    expect(productsId).to.contain(prod[2].id);
  });

  it("Should fetch product by id", async () => {
    const product = products[0];
    const res = await server.inject({
      method: "GET",
      url: `/api/v1/products/${product.id}`,
    });

    expect(res.statusCode).to.equal(200);

    const json = JSON.parse(res.payload);

    expect(json.id).to.equal(product.id);
    expect(json.name).to.equal(product.name);
    expect(json.price).to.equal(product.price);
    expect(json.imageSrc).to.equal(product.imageSrc);
  });

  it("Should throw product not found", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/api/v1/products/6288893bc0347c59c78995ec",
    });

    const json = JSON.parse(res.payload);
    expect(res.statusCode).to.equal(404);
    expect(json.message).to.equal("Not Found");
  });

  it("Should update product", async () => {
    const { id } = products[1];

    const res = await server.inject({
      method: "POST",
      url: `/api/v1/products/${id}/cartRemoved`,
    });
    const res2 = await server.inject({
      method: "POST",
      url: `/api/v1/products/${id}/cartRemoved`,
    });

    expect(res.statusCode).to.be.equal(200);

    const ps = await db("products").select().where("id", id);
    const product = ps[0];
    expect(product).to.be.not.null();
    expect(product!.removedFromCart).to.be.equal(2);
  });
});
