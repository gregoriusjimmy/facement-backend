import { Response } from 'express'
import httpStatus from 'http-status'
import { ICustomRequest } from '../../types/common'
import catchAsync from '../../utils/catchAsync'
import { createResponse } from '../../utils/createResponse'
import faceApiService from './faceApi.service'
import { IIsPhotoValidSchema } from './faceApi.validation'

const isPhotoValid = catchAsync(async (req: ICustomRequest<IIsPhotoValidSchema>, res: Response) => {
  const isPhotoValid = await faceApiService.ihPhotoValid(req.body)
  if (isPhotoValid) {
    res
      .status(httpStatus.OK)
      .json(createResponse({ ok: true, message: 'Photo is valid', data: { isValid: isPhotoValid } }))
  } else {
    res.status(httpStatus.OK).json(
      createResponse({
        ok: false,
        message: 'Face is not detected, please try again',
        data: { isValid: isPhotoValid },
      })
    )
  }
})

export default { isPhotoValid }
