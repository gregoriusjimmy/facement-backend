import { Response } from 'express'
import httpStatus from 'http-status'
import { ICustomRequest } from '../../types/common'
import ApiError from '../../utils/ApiError'
import catchAsync from '../../utils/catchAsync'
import { accountService } from '../account'
import { faceApiService } from '../faceApi'
import { transactionService } from './'
import { IPaySchema, ITopUpSchema } from './transaction.validation'

const topUp = catchAsync(async (req: ICustomRequest<ITopUpSchema>, res: Response) => {
  const { transaction, account } = await transactionService.topUp(req.body)
  res.status(httpStatus.CREATED).json({ transaction, balance: account.balance })
})

const pay = catchAsync(async (req: ICustomRequest<IPaySchema>, res: Response) => {
  const account = await accountService.findAccountByPhoneNumber(req.body.phoneNumber)
  if (!account) throw new ApiError(httpStatus.NOT_FOUND, "Err doesn't exist")

  const descriptor = await faceApiService.constructFaceDescriptor(req.body.photo)

  const { match } = await faceApiService.generateFaceSimilarity(descriptor, req.body.photo)
  if (match) throw new ApiError(httpStatus.BAD_REQUEST, 'Face is not match')

  if (account.balance - req.body.amount < 0)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Balance is not sufficient, please sign in to Facement account and do Top up'
    )
  const result = await transactionService.pay({ accountId: account.id, amount: req.body.amount })
  res.status(httpStatus.CREATED).json({ transaction: result.transaction, balance: result.account.balance })
})

export default { topUp, pay }
