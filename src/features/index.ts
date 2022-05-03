import express from 'express'
import authRoute from './auth/auth.router'
import accountRoute from './account/account.router'
import faceApiRoute from './faceApi/faceApi.router'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/accounts',
    route: accountRoute,
  },
  {
    path: '/face-api',
    route: faceApiRoute,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
