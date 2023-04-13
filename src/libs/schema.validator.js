import Joi from 'joi';

const userSchema = Joi.object({
  image: Joi.string(),
  name: Joi.string().min(3),
  surname: Joi.string().min(3),
  email: Joi.string().email().required(),
  phone: Joi.number().min(8),
  country: Joi.string(),
  province: Joi.string().min(4),
  password: Joi.string().required().min(6).max(30),
  birthday: Joi.string().min(3),
});

const loginUserSchema = Joi.object({
  // username: Joi.string().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30),
});

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  model: Joi.string().required(),
  series: Joi.string(),
  price: Joi.string().required(),
  rating: Joi.number().min(1).max(5),
  description: Joi.string().required(),
  stock: Joi.number().required().min(1),
  image: Joi.string(),
  category: Joi.string(),
  color: Joi.string(),
  brand: Joi.string().required(),
  size: Joi.string(),
  modelName: Joi.string(),
});

export { userSchema, loginUserSchema, createProductSchema };
