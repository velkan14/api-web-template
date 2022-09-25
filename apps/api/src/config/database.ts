import { randomUUID } from "crypto";
import knex from "knex";
import products from "./products.json";

export const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./mydb.sqlite",
  },
});

export const databaseInit = async () => {
  const hasProductsTable = await db.schema.hasTable("products");
  if (!hasProductsTable) {
    await db.schema.createTable("products", (table) => {
      table.uuid("id").primary();
      table.string("name");
      table.string("imageSrc");
      table.float("price");
      table.integer("removedFromCart").defaultTo(0);
    });
  }
};

export const databaseSeed = async () => {
  const newProducts = products.map((p) => {
    return {
      ...p,
      id: randomUUID(),
      imageSrc: `https://robohash.org/${p.name.replace(/\s/g, "")}`,
    };
  });

  await db("products").del();
  await db("products").insert(newProducts);
};
