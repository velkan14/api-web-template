import { db } from "../../config/database";
import { Product } from "../interfaces/product";

export const getProduct = async ({ productId }: { productId: string }) => {
  const products = await db<Product>("products")
    .select()
    .where({ id: productId });

  if (products.length > 0) return products[0];
  return null;
};

export const getProductsFiltered = async ({ ids }: { ids: string[] }) => {
  return await db<Product>("products").select().whereIn("id", ids);
};

export const getAllProducts = async ({
  limit = 10,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}) => {
  return await db<Product>("products").select().limit(limit).offset(offset);
};

export const countProducts = async () => {
  const count = await db("products").count("id as CNT").first();
  return count?.CNT;
};

export const incrementRemovedFromCart = async (productId: string) => {
  return await db("products")
    .where({ id: productId })
    .increment("removedFromCart", 1);
};
