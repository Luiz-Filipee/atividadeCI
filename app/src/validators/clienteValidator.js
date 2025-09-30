const Joi = require('joi');

const clienteSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().pattern(/^[0-9]{10,11}$/).required()
});

module.exports = clienteSchema;
