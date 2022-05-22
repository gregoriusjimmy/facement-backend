import { Response } from 'express'
import httpStatus from 'http-status'
import { ICustomRequest } from '../../types/common'
import ApiError from '../../utils/ApiError'
import catchAsync from '../../utils/catchAsync'
import accountService from '../account/account.service'
import authService from './auth.service'
import { ILoginSchema, IRegisterSchema, IVerifyTokenSchema } from './auth.validation'
import bcrypt from 'bcrypt'

const register = catchAsync(async (req: ICustomRequest<IRegisterSchema>, res: Response) => {
  const { email, password, phoneNumber, photo } = req.body
  const isEmailExist = await accountService.findAccountByEmail(email)
  if (isEmailExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Account already exist')

  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)
  const newAccount = await accountService.createAccount({ email, password: hash, phoneNumber, photo })
  if (!newAccount) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create account')

  res.status(httpStatus.CREATED).send()
})

const login = catchAsync(async (req: ICustomRequest<ILoginSchema>, res: Response) => {
  const { email, password } = req.body
  const account = await accountService.findAccountByEmail(email)
  if (!account) throw new ApiError(httpStatus.NOT_FOUND, 'Account not found')

  const passwordMatch = await bcrypt.compare(password, account.password)
  if (!passwordMatch) throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password')

  const token = authService.createToken(account.email)

  res.status(httpStatus.OK).json({ token })
})

const verifyToken = catchAsync(async (req: ICustomRequest<IVerifyTokenSchema>, res: Response) => {
  const isVerified = authService.verifyToken(req.body.context.token)
  res.status(httpStatus.OK).json({ isVerified })
})

export default { register, login, verifyToken }
