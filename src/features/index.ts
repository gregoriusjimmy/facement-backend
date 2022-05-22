import express from 'express'
import { authRouter } from './auth'
import { accountRouter } from './account'
import { faceApiRouter } from './faceApi'
import { transactionRouter } from './transaction'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/accounts',
    route: accountRouter,
  },
  {
    path: '/face-api',
    route: faceApiRouter,
  },
  {
    path: '/transaction',
    route: transactionRouter,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
