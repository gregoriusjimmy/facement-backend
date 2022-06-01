import Joi from 'joi'
import { body } from '../../validations/base'

const isAccountExistSchema = body.keys({
  email: Joi.string().required(),
})

export interface IIsAccountExistSchema {
  email: string
}

const isAccountWithPhoneNumberExistSchema = body.keys({
  email: Joi.string().required(),
})

export interface IIsAccountWithPhoneNumberExistSchema {
  email: string
}

const validatePhoneNumberSchema = body.keys({
  phoneNumber: Joi.string().required(),
})
export interface IValidatePhoneNumberSchema {
  phoneNumber: string
}

const getAccountSchema = body

export interface IGetAccountSchema {}

const getAccountBalanceSchema = body

export interface IGetAccountBalanceSchema {}

export default {
  isAccountExistSchema,
  getAccountBalanceSchema,
  getAccountSchema,
  validatePhoneNumberSchema,
  isAccountWithPhoneNumberExistSchema,
}
