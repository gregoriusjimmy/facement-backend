import express from 'express'
import transactionValidation from './transaction.validation'
import transactionController from './transaction.controller'
import validate from '../../middlewares/validate'
import { requireAuth } from '../auth/auth.middleware'

const router = express.Router()

router.post('/topUp', validate(transactionValidation.topUpSchema), requireAuth, transactionController.topUp)

export default router
