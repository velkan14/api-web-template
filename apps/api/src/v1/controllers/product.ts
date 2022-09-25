import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import {
  getProduct,
  getAllProducts,
  incrementRemovedFromCart,
  getProductsFiltered,
} from "../models/product";

export const get = async (request: Request, h: ResponseToolkit) => {
  const { productId } = request.params;

  if (productId === undefined || productId === null) return Boom.notFound();

  const product = await getProduct({ productId });

  if (!product) return Boom.notFound();

  return product;
};

export const getList = async (request: Request, h: ResponseToolkit) => {
  const {
    limit = 10,
    skip = 1,
    ids,
  } = request.query as {
    limit: number | undefined;
    skip: number | undefined;
    ids: string | undefined;
  };

  if (typeof ids === "string") {
    if (ids.length === 0) return [];

    const idsArray = ids.split(",");
    const products = await getProductsFiltered({ ids: idsArray });
    return products;
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
