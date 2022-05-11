import Joi from 'joi'
import { body } from '../../validations/base'

const isAccountExist = body.keys({
  email: Joi.string().required(),
})
export default { isAccountExist }
