import dotenv from 'dotenv'
import path, { join } from 'path'
import Joi from 'joi'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3001),
    JWT_SECRET_KEY: Joi.string().required().description('JWT secret key'),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET_KEY,
    duration: 3 * 60 * 60 * 1000,
  },
}
