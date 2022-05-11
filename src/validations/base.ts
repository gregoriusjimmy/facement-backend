import Joi from 'joi'

export const body = Joi.object().keys({
  body: Joi.object().keys({
    context: Joi.object().optional().keys({
      token: Joi.string(),
    }),
  }),
})
