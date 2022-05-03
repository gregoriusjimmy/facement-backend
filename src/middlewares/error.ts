import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/ApiError'

import httpStatus from 'http-status'
import { Prisma } from '@prisma/client'
import logger from '../configs/logger'
import config from '../configs/config'

const errorConverter = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error instanceof Prisma.PrismaClientKnownRequestError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode].toString()
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR].toString()
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ok: false,
    ...(config.env === 'development' && { stack: err.stack }),
  }

  if (config.env === 'development') {
    logger.error(err)
  }

  res.status(statusCode).json({ ...response })
}

export { errorConverter, errorHandler }
