import { db } from "../../config/database";
import { Product } from "../interfaces/product";

export const getProduct = async (productId: string) => {
  const products = await db<Product>("products")
    .select()
    .where({ id: productId });
  if (products.length > 0) return products[0];
  return null;
};

export const getAllProducts = async () => {
  return await db<Product>("products").select();
};

export const updateProduct = async (product: Product) => {
  return await db("products").where({ id: product.id }).update(product);
};

export const incrementRemovedFromCart = async (productId: string) => {
  return await db("products")
    .where({ id: productId })
    .increment("removedFromCart", 1);
};
