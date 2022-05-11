import Joi from 'joi'
import { body } from '../../validations/base'

const ihPhotoValid = body.keys({
  photo: Joi.string().required(),
})

export default { ihPhotoValid }
