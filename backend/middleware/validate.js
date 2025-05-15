const Joi = require('joi');

const validateStudent = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().optional(),
    pay_rate: Joi.number().positive().required(),
    zoom_link: Joi.string().uri().optional(),
    weekly_schedule: Joi.string().optional(),
});

  const { error } = schema.validate(req.body);
  if (error) 
    return res.status(400).json({ error: error.details[0].message });
    next();
};

module.exports = { validateStudent };