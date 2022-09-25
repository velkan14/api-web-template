import joi from "joi";

export const productSchema = joi.object({
  id: joi.string().required(),
  name: joi.string().min(3).max(128).required(),
  price: joi.number().positive().required(),
  removedAtCheckout: joi.number(),
});
