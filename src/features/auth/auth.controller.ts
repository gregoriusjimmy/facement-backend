import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import authService from './auth.service'

const register = catchAsync(async (req: Request, res: Response) => {
  const account = await authService.register(req.body)
  res.status(httpStatus.CREATED).json({ email: account.email })
})

const login = catchAsync(async (req: Request, res: Response) => {
  const account = await authService.login(req.body)
  res.json({ email: account.email })
})

export default { register, login }
