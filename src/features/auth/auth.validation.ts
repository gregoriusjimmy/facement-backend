import { body } from '../../validations/base'
import Joi from 'joi'

const register = body.keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  photo: Joi.string().required(),
})

const login = body.keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

const verifyToken = body

export default { login, register, verifyToken }
