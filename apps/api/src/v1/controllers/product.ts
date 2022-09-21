import { Request, ResponseToolkit } from "@hapi/hapi";
import { getProduct, getAllProducts, updateProduct } from "../models/product";

export const get = async (request: Request, h: ResponseToolkit) => {
  const { productId } = request.params;
  if (productId) {
    return await getProduct(productId);
  }
  const products = await getAllProducts();
  return products;
};

export const cartRemovedProduct = async (
  request: Request,
  h: ResponseToolkit
) => {
  //FIXME: should be a transatiction
  const product = await getProduct(request.params.productId);

  const newProduct = {
    ...product,
    removedFromCart: product.removedFromCart + 1,
  };

  await updateProduct(newProduct);
  return newProduct;
};
