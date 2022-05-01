import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from './features/index'
import ApiError from './utils/ApiError'
import httpStatus from 'http-status'
import { errorConverter, errorHandler } from './middlewares/error'
import morgan from './configs/morgan'
const xss = require('xss-clean')

const app = express()

app.use(morgan.successHandler)
app.use(morgan.errorHandler)

// set security HTTP headers
app.use(helmet())

app.use(express.json())
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss())

// enable cors
app.use(cors())
app.options('*', cors)

app.use('/api', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app
