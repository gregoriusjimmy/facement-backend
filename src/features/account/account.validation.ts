import Joi from 'joi'

const isAccountExist = {
  body: Joi.object().keys({
    email: Joi.string().required(),
  }),
}
export default { isAccountExist }
