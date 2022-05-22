import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import transactionService from './transaction.service'

const topUp = catchAsync(async (req: Request, res: Response) => {
  const transaction = await transactionService.topUp(req.body)
  res.status(httpStatus.CREATED).json({ transaction })
})

export default { topUp }
