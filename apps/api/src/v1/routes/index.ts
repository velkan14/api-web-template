import { ServerRoute } from "@hapi/hapi";
import { addPrefixToPaths } from "../helpers/path";
import product from "./product";

const routes: ServerRoute[] = [...addPrefixToPaths(product, "/products")];

export default routes;
