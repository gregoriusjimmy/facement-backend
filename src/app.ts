import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from './features/index'
import ApiError from './utils/ApiError'
import httpStatus from 'http-status'

const app = express()
app.use(helmet())
// enable cors
app.use(cors())
app.options('*', cors)

app.use(express.json())
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

app.listen(3001, () => console.log(`🚀 Server ready at: http://localhost:${3001}`))
