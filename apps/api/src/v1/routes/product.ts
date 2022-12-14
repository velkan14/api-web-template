import { ServerRoute } from "@hapi/hapi";
import joi from "joi";
import { get, cartRemovedProduct, getList } from "../controllers/product";

const routes: ServerRoute[] = [
  {
    method: "GET",
    path: "/",
    handler: getList,
  },
  {
    method: "GET",
    path: "/{productId}",
    handler: get,
  },
  {
    method: "POST",
    path: "/{productId}/cartRemoved",
    handler: cartRemovedProduct,
    options: {
      validate: {
        params: joi.object({
          productId: joi.string().required(),
        }),
      },
    },
  },
];

export default routes;
