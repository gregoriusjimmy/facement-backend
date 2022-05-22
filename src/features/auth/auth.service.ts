import httpStatus from 'http-status'
import ApiError from '../../utils/ApiError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../configs/config'
import logger from '../../configs/logger'
import { TTokenPayload } from '../../types/common'

const isTokenVerified = (token: string) => {
  let isVerified = false
  jwt.verify(token, config.jwt.secret, (err: any, decoded: any) => {
    if (err) {
      logger.info('jwt verify err: ' + err)
      return
    }
    isVerified = true
  })
  return isVerified
}

const decodeToken = (token: string) => {
  if (!isTokenVerified(token)) return null
  return jwt.decode(token) as TTokenPayload
}

const createToken = (payload: TTokenPayload) => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.duration })
}

export default { createToken, isTokenVerified, decodeToken }
