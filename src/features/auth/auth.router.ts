import express from 'express'
import authValidation from './auth.validation'
import authController from './auth.controller'
import validate from '../../middlewares/validate'

const router = express.Router()

router.post('/register', validate(authValidation.register), authController.register)
router.post('/login', validate(authValidation.login), authController.login)
router.post('/verify/token', validate(authValidation.verifyToken), authController.verifyToken)

export default router
