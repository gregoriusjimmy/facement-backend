import Joi from 'joi'

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    photo: Joi.string().required(),
  }),
}

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}

export default { login, register }
