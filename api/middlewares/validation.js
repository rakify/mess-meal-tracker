//This route validates all post requests if the data is correct using the help of joi

const Joi = require("joi");

module.exports.entryValidation = entryValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    createdAt: Joi.allow(""),
    updatedAt: Joi.allow(""),
    __v: Joi.allow(""),
    user: Joi.string().required(),
    date: Joi.number().required(),
    admin_key: Joi.required(),
    spent: Joi.number().min(0).required(),
    reserved: Joi.number().required(),
    by: Joi.string().required(),
    meals: Joi.object().required(),
    totalMeals: Joi.number().min(0).required(),
  });
  return schema.validate(data);
};
