import { body } from '../../validations/base'
import Joi from 'joi'

const topUpSchema = body.keys({
  accountId: Joi.number().required(),
  amount: Joi.number().required(),
})

export interface ITopUpSchema {
  accountId: number
  amount: number
}

const paySchema = body.keys({
  phoneNumber: Joi.string().required(),
  photo: Joi.string().required(),
  amount: Joi.number().required(),
})

export interface IPaySchema {
  phoneNumber: string
  photo: string
  amount: number
}
export default { topUpSchema, paySchema }
