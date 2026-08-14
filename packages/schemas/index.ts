import Joi from "joi";




export const UrlShorteningDTOSchema = Joi.object({
  id: Joi.string().uuid().required(),
  url: Joi.string().uri().required(),
  shortCode: Joi.string().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});




export const UrlShorteningStatisticsSchema = Joi.object({
  id: Joi.string().uuid().required(),
  url: Joi.string().uri().required(),
  shortCode: Joi.string().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
  accessCount: Joi.number().required(),
});

export const createUrlShorteningSchema = Joi.object({
  url: Joi.string().uri().required(),
});

export const schemashortcode = Joi.object({
  shortCode: Joi.string().required(),
});


