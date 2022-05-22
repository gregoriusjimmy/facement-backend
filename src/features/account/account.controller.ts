import httpStatus from 'http-status'
import { Response } from 'express'
import { ICustomRequest } from '../../types/common'
import catchAsync from '../../utils/catchAsync'
import { IGetAccountBalanceSchema, IIsAccountExistSchema } from './account.validation'
import { authService } from '../auth'
import { accountService } from './'

const isAccountExist = catchAsync(async (req: ICustomRequest<IIsAccountExistSchema>, res: Response) => {
  const isAccountExist = await accountService.findAccountByEmail(req.body.email)
  res.status(httpStatus.OK).json({
    isAccountExist: !!isAccountExist,
  })
})

const getBalance = catchAsync(async (req: ICustomRequest<IGetAccountBalanceSchema>, res: Response) => {
  // authService.decodeJwt(req.body)
  // const account = await accountService.findAccountByEmail(req.body.)
  // res.status(httpStatus.OK).json({
  //   account: account?.balance,
  // })
})

export default { isAccountExist, getBalance }
