import { Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../configs/config'
import ApiError from '../../utils/ApiError'
import catchAsync from '../../utils/catchAsync'
import authService from './auth.service'

const register = catchAsync(async (req: Request, res: Response) => {
  const isEmailExist = await authService.getAccount({ email: req.body.email })
  if (isEmailExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist')

  const result = await authService.register(req.body)
  const { newAccount, token } = result
  if (!newAccount) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create account')

  res.cookie('jwt', token, { httpOnly: true, maxAge: config.jwt.duration })
  res.status(httpStatus.CREATED).json({ email: newAccount.email, id: newAccount.id })
})

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body)
  const { account, token } = result
  if (!account) throw new ApiError(httpStatus.NOT_FOUND, 'Account not found')

  res.cookie('jwt', token, { httpOnly: true, maxAge: config.jwt.duration })
  res.status(httpStatus.OK).json({ email: account.email, id: account.id })
})

const getAccount = catchAsync(async (req: Request, res: Response) => {
  const isFound = await authService.getAccount(req.body)
  res.status(httpStatus.OK).json(isFound)
})

export default { register, login, getAccount }
