import express from 'express'
import authValidation from './auth.validation'
import authController from './auth.controller'
import validate from '../../middlewares/validate'

const router = express.Router()

router.post('/register', validate(authValidation.register), authController.register)
router.post('/login', validate(authValidation.login), authController.login)
router.post('/account/get', validate(authValidation.isEmailExist), authController.getAccount)

export default router
