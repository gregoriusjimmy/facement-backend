import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import faceApiService from './faceApi.service'

const isPhotoValid = catchAsync(async (req: Request, res: Response) => {
  const isPhotoValid = await faceApiService.ihPhotoValid(req.body)
  if (isPhotoValid) res.status(httpStatus.OK).json({ ok: true, message: 'Photo is valid', isValid: isPhotoValid })
  else
    res
      .status(httpStatus.OK)
      .json({ ok: false, message: 'Face is not detected, please try again', isValid: isPhotoValid })
})

export default { isPhotoValid }
