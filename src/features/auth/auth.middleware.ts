import ApiError from '../../utils/ApiError'
import authService from './auth.service'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { Request, Response, NextFunction } from 'express'
import { IContextSchema } from '../../types/common'

const requireAuth = catchAsync(async (req: Request<IContextSchema>, res: Response, next: NextFunction) => {
  const isVerified = authService.verifyToken(req.body)
  if (!isVerified) {
    const err = new ApiError(httpStatus.UNAUTHORIZED, 'Not Authorized')
    return next(err)
  }
  return next()
})

export { requireAuth }
