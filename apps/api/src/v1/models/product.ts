import { db } from "../../config/database";
import { Product } from "../interfaces/product";

export const getProduct = async (productId: string) => {
  const products = await db<Product>("products")
    .select()
    .where({ id: productId });
  return products[0];
};

export const getAllProducts = async () => {
  return await db<Product>("products").select();
};

export const updateProduct = async (product: Product) => {
  return await db<Product>("products")
    .where({ id: product.id })
    .update(product);
};
