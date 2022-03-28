import Joi from 'joi';

export const registerValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    let message;
    const { details } = error;
    message = details[0].message;
    res.status(422);
    throw new Error(message);
  }

  return next();
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    const { details } = error;
    res.status(422);
    throw new Error(details[0].message);
  }

  return next();
};
