import { IContextSchema, TAccountModel } from '../../types/common'
import { body } from '../../validations/base'
import Joi from 'joi'

const registerSchema = body.keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  photo: Joi.string().required(),
})

export interface IRegisterSchema extends TAccountModel {}

const loginSchema = body.keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export interface ILoginSchema {
  email: string
  password: string
}

const verifyTokenSchema = body

export interface IVerifyTokenSchema extends IContextSchema {}

export default { loginSchema, registerSchema, verifyTokenSchema }
