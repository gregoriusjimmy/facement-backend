import httpStatus from 'http-status'
import { Response } from 'express'
import { ICustomRequest } from '../../types/common'
import catchAsync from '../../utils/catchAsync'
import accountService from './account.service'
import { IIsAccountExistSchema } from './account.validation'
import { createResponse } from '../../utils/createResponse'

const isAccountExist = catchAsync(async (req: ICustomRequest<IIsAccountExistSchema>, res: Response) => {
  const isAccountExist = await accountService.findAccountByEmail(req.body.email)
  res.status(httpStatus.OK).json(
    createResponse({
      data: {
        isAccountExist: !!isAccountExist,
      },
      ok: true,
      message: isAccountExist
        ? 'Email already in used'
        : 'Account with this email is does not exist, please create an account first',
    })
  )
})

export default { isAccountExist }
