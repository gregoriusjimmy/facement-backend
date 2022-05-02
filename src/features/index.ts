import express from 'express'
import authRoute from './auth/auth.router'
import accountRoute from './account/account.router'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/account',
    route: accountRoute,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
