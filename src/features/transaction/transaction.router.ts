import express from 'express'
import transactionValidation from './transaction.validation'
import transactionController from './transaction.controller'
import validate from '../../middlewares/validate'
import { authMiddleware } from '../auth'

const router = express.Router()

router.post(
  '/topUp',
  validate(transactionValidation.topUpSchema),
  authMiddleware.requireAuth,
  transactionController.topUp
)
router.post('/pay', validate(transactionValidation.paySchema), transactionController.pay)
router.post(
  '/get/lastFive',
  validate(transactionValidation.getLastFiveTransactions),
  authMiddleware.requireAuth,
  transactionController.getLastFiveTransactions
)

export default router
