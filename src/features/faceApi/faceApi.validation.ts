import Joi from 'joi'
import { body } from '../../validations/base'

const isPhotoValidSchema = body.keys({
  photo: Joi.string().required(),
})

export interface IIsPhotoValidSchema {
  photo: string
}

export default { isPhotoValidSchema }
