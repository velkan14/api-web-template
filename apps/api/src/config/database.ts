import knex from "knex";
import products from "./products.json";

export const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./mydb.sqlite",
  },
});

export const seed = async () => {
  const hasProductsTable = await db.schema.hasTable("products");
  if (!hasProductsTable) {
    await db.schema.createTable("products", (table) => {
      table.increments(); //FIXME: The id should be a uuid
      table.string("name");
      table.float("price");
      table.integer("removedFromCart").defaultTo(0);
    });
    db("products").del();
    await db("products").insert(products);
  }
};
