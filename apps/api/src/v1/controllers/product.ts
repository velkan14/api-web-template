import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import {
  getProduct,
  getAllProducts,
  incrementRemovedFromCart,
} from "../models/product";

export const get = async (request: Request, h: ResponseToolkit) => {
  const { productId } = request.params;
  const { limit = 10, skip = 1 } = request.query;

  if (productId) {
    const product = await getProduct({ productId });
    if (!product) return Boom.notFound();
    return product;
  }
  const page = limit * skip - limit;

  const products = await getAllProducts({
    limit,
    offset: page,
  });

  return products;
};

export const cartRemovedProduct = async (
  request: Request,
  h: ResponseToolkit
) => {
  const result = await incrementRemovedFromCart(request.params.productId);
  if (result !== 1) return Boom.notFound();
  return "Updated";
};
