import Joi from 'joi'

const ihPhotoValid = {
  body: Joi.object().keys({
    photo: Joi.string().required(),
  }),
}
export default { ihPhotoValid }
