import jwt from 'jsonwebtoken'
import config from '../../configs/config'

const createToken = (id: string) => {
  return jwt.sign({ id }, config.jwt.secret, { expiresIn: config.jwt.duration })
}

export default { createToken }
