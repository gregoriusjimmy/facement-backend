import { Response } from 'express'
import httpStatus from 'http-status'
import { ICustomRequest } from '../../types/common'
import catchAsync from '../../utils/catchAsync'
import faceApiService from './faceApi.service'
import { IIsPhotoValidSchema } from './faceApi.validation'

const isPhotoValid = catchAsync(async (req: ICustomRequest<IIsPhotoValidSchema>, res: Response) => {
  const isPhotoValid = await faceApiService.ihPhotoValid(req.body)
  res.status(httpStatus.OK).json({ isValid: isPhotoValid })
})

export default { isPhotoValid }
