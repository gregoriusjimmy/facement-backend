import httpStatus from 'http-status'
import { Response } from 'express'
import { ICustomRequest } from '../../types/common'
import catchAsync from '../../utils/catchAsync'
import accountService from './account.service'
import { IIsAccountExistSchema } from './account.validation'

const isAccountExist = catchAsync(async (req: ICustomRequest<IIsAccountExistSchema>, res: Response) => {
  const isAccountExist = await accountService.findAccountByEmail(req.body.email)
  res.status(httpStatus.OK).json({
    isAccountExist: !!isAccountExist,
  })
})

export default { isAccountExist }
