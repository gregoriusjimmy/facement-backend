import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import accountService from './account.service'

const isAccountExist = catchAsync(async (req: Request, res: Response) => {
  const isAccountExist = await accountService.isAccountExist(req.body)
  res
    .status(httpStatus.OK)
    .json({ isAccountExist, ok: true, message: isAccountExist ? 'Email already in used' : 'Account is not exist' })
})

export default { isAccountExist }
