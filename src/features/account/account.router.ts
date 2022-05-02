import express from 'express'
import accountValidation from './account.validation'
import accountController from './account.controller'
import validate from '../../middlewares/validate'

const router = express.Router()

router.post('/exist', validate(accountValidation.isAccountExist), accountController.isAccountExist)

export default router
