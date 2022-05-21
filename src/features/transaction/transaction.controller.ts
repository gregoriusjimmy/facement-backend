import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { createResponse } from '../../utils/createResponse'
import transactionService from './transaction.service'

const topUp = catchAsync(async (req: Request, res: Response) => {
  const transaction = await transactionService.topUp(req.body)
  res.status(httpStatus.CREATED).json(createResponse({ data: { transaction }, ok: true, message: 'Top Up Success' }))
})

export default { topUp }
