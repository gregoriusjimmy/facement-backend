import httpStatus from 'http-status'
import { Response } from 'express'
import { ICustomRequest } from '../../types/common'
import catchAsync from '../../utils/catchAsync'
import { IGetAccountSchema, IIsAccountExistSchema, IIsAccountWithPhoneNumberExistSchema } from './account.validation'
import { accountService } from './'
import ApiError from '../../utils/ApiError'

const isAccountExist = catchAsync(async (req: ICustomRequest<IIsAccountExistSchema>, res: Response) => {
  const isAccountExist = await accountService.findAccountByEmail(req.body.email)
  res.status(httpStatus.OK).json({
    isAccountExist: !!isAccountExist,
  })
})

const isAccountWithPhoneNumberExist = catchAsync(
  async (req: ICustomRequest<IIsAccountWithPhoneNumberExistSchema>, res: Response) => {
    const isAccountExist = await accountService.findAccountByPhoneNumber(req.body.phoneNumber)
    res.status(httpStatus.OK).json({
      isAccountExist: !!isAccountExist,
    })
  }
)

const getAccount = catchAsync(async (req: ICustomRequest<IGetAccountSchema>, res: Response) => {
  const account = await accountService.findAccountByEmail(res.locals.email)
  if (!account) throw new ApiError(httpStatus.NOT_FOUND, 'Error, account not found')
  const { id, email, balance } = account
  res.status(httpStatus.OK).json({
    account: {
      id,
      email,
      balance,
    },
  })
})

export default { isAccountExist, getAccount, isAccountWithPhoneNumberExist }
