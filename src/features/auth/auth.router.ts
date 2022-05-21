import express from 'express'
import authValidation from './auth.validation'
import authController from './auth.controller'
import validate from '../../middlewares/validate'

const router = express.Router()

router.post('/register', validate(authValidation.registerSchema), authController.register)
router.post('/login', validate(authValidation.loginSchema), authController.login)
router.post('/verify/token', validate(authValidation.verifyTokenSchema), authController.verifyToken)

export default router
