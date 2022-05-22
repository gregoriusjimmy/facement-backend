import Joi from 'joi'
import { body } from '../../validations/base'

const isAccountExistSchema = body.keys({
  email: Joi.string().required(),
})

export interface IIsAccountExistSchema {
  email: string
}
const getAccountBalanceSchema = body

export interface IGetAccountBalanceSchema {}

export default { isAccountExistSchema, getAccountBalanceSchema }
