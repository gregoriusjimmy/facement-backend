import express from 'express'
import accountValidation from './account.validation'
import accountController from './account.controller'
import validate from '../../middlewares/validate'
import authMiddleware from '../auth/auth.middleware'

const router = express.Router()

router.post(
  '/exist/phoneNumber',
  validate(accountValidation.isAccountWithPhoneNumberExistSchema),
  accountController.isAccountWithPhoneNumberExist
)
router.post('/exist', validate(accountValidation.isAccountExistSchema), accountController.isAccountExist)
router.post(
  '/get',
  validate(accountValidation.getAccountSchema),
  authMiddleware.requireAuth,
  accountController.getAccount
)

export default router
