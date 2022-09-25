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

    const json = JSON.parse(res.payload);
    expect(res.statusCode).to.equal(200);
    expect(json.length).to.equal(10);
    expect(json[0]).to.include("id");
    expect(json[0]).to.include("name");
    expect(json[0]).to.include("price");
    expect(json[0]).to.include("imageSrc");
  });

  it("Should list products max 2", async () => {
    const res = await server.inject({
      method: "get",
      url: "/api/v1/products?limit=2",
    });

    const json = JSON.parse(res.payload);
    expect(res.statusCode).to.equal(200);
    expect(json.length).to.equal(2);
    expect(json[0]).to.include("id");
    expect(json[0]).to.include("name");
    expect(json[0]).to.include("price");
    expect(json[0]).to.include("imageSrc");
  });

  it("Should list products max 2 from second page", async () => {
    const product = products[2];
    const res = await server.inject({
      method: "get",
      url: "/api/v1/products?limit=2&skip=2",
    });

    const json = JSON.parse(res.payload);
    expect(res.statusCode).to.equal(200);
    expect(json.length).to.equal(2);
    expect(json[0]).to.include("id");
    expect(json[0]).to.include("name");
    expect(json[0]).to.include("price");
    expect(json[0]).to.include("imageSrc");
    expect(json[0].id).to.equal(product.id);
    expect(json[0].name).to.equal(product.name);
    expect(json[0].price).to.equal(product.price);
    expect(json[0].imageSrc).to.equal(product.imageSrc);
  });

  it("Should fetch product by id", async () => {
    const product = products[0];
    const res = await server.inject({
      method: "GET",
      url: `/api/v1/products/${product.id}`,
    });

    const json = JSON.parse(res.payload);
    expect(res.statusCode).to.equal(200);
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
