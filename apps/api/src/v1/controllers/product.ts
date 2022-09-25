import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import {
  getProduct,
  getAllProducts,
  updateProduct,
  incrementRemovedFromCart,
} from "../models/product";

export const get = async (request: Request, h: ResponseToolkit) => {
  const { productId } = request.params;
  if (productId) {
    const product = await getProduct(productId);
    if (!product) return Boom.notFound();
    return product;
  }
  const products = await getAllProducts();
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
