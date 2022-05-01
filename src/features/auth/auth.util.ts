import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import config from '../../configs/config'
import ApiError from '../../utils/ApiError'

const createToken = (id: string) => {
  if (!process.env.JWT_SECRET_KEY) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'JWT_SECRET_KEY not provided')
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: config.jwt.duration })
}

export default { createToken }
