import { Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../configs/config'
import ApiError from '../../utils/ApiError'
import catchAsync from '../../utils/catchAsync'
import accountService from '../account/account.service'
import authService from './auth.service'

const register = catchAsync(async (req: Request, res: Response) => {
  const isEmailExist = await accountService.isAccountExist({ email: req.body.email })
  if (isEmailExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Account already exist')

  const result = await authService.register(req.body)
  const { newAccount, token } = result
  if (!newAccount) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create account')

  res.status(httpStatus.CREATED).json({ token, ok: true, message: 'Success create an account' })
})

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body)
  const { account, token } = result
  if (!account) throw new ApiError(httpStatus.NOT_FOUND, 'Account not found')

  res.status(httpStatus.OK).json({ token, ok: true, message: 'Login Success' })
})

const verifyToken = catchAsync(async (req: Request, res: Response) => {
  const isVerified = authService.verifyToken(req.body)
  if (!isVerified) res.status(httpStatus.OK).json({ isVerified, ok: true, message: 'Verified' })
  res.status(httpStatus.OK).json({ isVerified, ok: true, message: 'Not verified' })
})

export default { register, login, verifyToken }
