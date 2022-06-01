import express from 'express'
import faceApiValidation from './faceApi.validation'
import faceApiController from './faceApi.controller'
import validate from '../../middlewares/validate'

const router = express.Router()

router.post('/validate', validate(faceApiValidation.isPhotoValidSchema), faceApiController.isPhotoValid)

export default router
