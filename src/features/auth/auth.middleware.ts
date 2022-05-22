import ApiError from '../../utils/ApiError'
import { authService } from './'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { Response, NextFunction } from 'express'
import { IContextSchema, ICustomRequest } from '../../types/common'

const requireAuth = catchAsync(async (req: ICustomRequest<IContextSchema>, res: Response, next: NextFunction) => {
  const { token } = req.body.context
  const decodedToken = authService.decodeToken(token)
  if (!decodedToken) {
    const err = new ApiError(httpStatus.UNAUTHORIZED, 'Not Authorized')
    return next(err)
  }
  res.locals.email = decodedToken.email
  return next()
})

export default { requireAuth }
