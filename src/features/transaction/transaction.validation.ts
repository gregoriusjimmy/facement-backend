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
export default { topUpSchema }
