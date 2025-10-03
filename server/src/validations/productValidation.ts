import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().required(),
  // Vriffier que 'number()' est bien appelé sur 'Joi'
  price: Joi.number().required(), 
  description: Joi.string().optional(),
});