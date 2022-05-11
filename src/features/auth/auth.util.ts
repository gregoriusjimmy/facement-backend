import jwt from 'jsonwebtoken'
import config from '../../configs/config'
import logger from '../../configs/logger'

const createToken = (payload: any) => {
  return jwt.sign({ payload }, config.jwt.secret, { expiresIn: config.jwt.duration })
}

const isJwtValid = (token: string): boolean => {
  let isValid = false
  jwt.verify(token, config.jwt.secret, (err: any, decoded: any) => {
    if (err) {
      logger.info('jwt verify err: ' + err)
      isValid = false
    }
    isValid = true
  })
  return isValid
}

export default { createToken, isJwtValid }
