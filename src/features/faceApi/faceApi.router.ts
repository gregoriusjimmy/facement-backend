import express from 'express'
import faceApiValidation from './faceApi.validation'
import faceApiController from './faceApi.controller'
import validate from '../../middlewares/validate'
import { authMiddleware } from '../auth'

const router = express.Router()

router.post(
  '/valid',
  validate(faceApiValidation.isPhotoValidSchema),
  authMiddleware.requireAuth,
  faceApiController.isPhotoValid
)

export default router
