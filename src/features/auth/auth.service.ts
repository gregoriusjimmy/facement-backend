import httpStatus from 'http-status'
import ApiError from '../../utils/ApiError'
import jwt from 'jsonwebtoken'
import config from '../../configs/config'
import logger from '../../configs/logger'

const decodeJwt = (token: string) => {
  let decodedJwt
  jwt.verify(token, config.jwt.secret, (err: any, decoded: any) => {
    if (err) {
      logger.info('jwt verify err: ' + err)
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token is not valid')
    }
    decodedJwt = decoded
  })
  return decodedJwt
}

const verifyToken = (token: string) => {
  const decodedJwt = decodeJwt(token)
  if (decodedJwt) return true
  return false
}

const createToken = (payload: any) => {
  return jwt.sign({ payload }, config.jwt.secret, { expiresIn: config.jwt.duration })
}

export default { createToken, decodeJwt, verifyToken }
