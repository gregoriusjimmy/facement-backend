import httpStatus from 'http-status'
import * as faceapi from 'face-api.js'
import * as canvas from 'canvas'
import ApiError from '../../utils/ApiError'
import logger from '../../configs/logger'

const constructFaceDescriptor = async (photo: string) => {
  try {
    const image = (await canvas.loadImage(photo)) as any
    const fullFaceDescription = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
    return fullFaceDescription?.descriptor
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Something went wrong'
    )
  }
}

const generateFaceSimilarity = async (descriptor: Float32Array, photo: string) => {
  const THRESHOLD = 0.3
  try {
    const photoDescriptor = await constructFaceDescriptor(photo)
    if (!photoDescriptor) throw new ApiError(httpStatus.BAD_REQUEST, 'Face is not detected')
    const distance = faceapi.utils.round(faceapi.euclideanDistance(descriptor, photoDescriptor))
    const match = distance < THRESHOLD
    logger.info('face similarity generated')
    logger.info({ distance, match })
    return { distance, match }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Something went wrong'
    )
  }
}
export default { constructFaceDescriptor, generateFaceSimilarity }
