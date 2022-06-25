import httpStatus from 'http-status'
import * as faceapi from 'face-api.js'
import * as canvas from 'canvas'
import ApiError from '../../utils/ApiError'
import logger from '../../configs/logger'

const constructFaceDescriptor = async (photo: string) => {
  try {
    const image = (await canvas.loadImage(photo)) as any
    const fullFaceDescription = await faceapi
      .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()

    return fullFaceDescription?.descriptor
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Something went wrong'
    )
  }
}

const generateFaceSimilarity = async (descriptor1: Float32Array, descriptor2: Float32Array) => {
  const THRESHOLD = 0.3
  try {
    const distance = faceapi.euclideanDistance(descriptor1, descriptor2)
    const match = distance < THRESHOLD
    logger.info('face similarity generated')
    logger.info(`distance: ${distance}`)
    logger.info(`match: ${match}`)
    return { distance, match }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Something went wrong'
    )
  }
}
export default { constructFaceDescriptor, generateFaceSimilarity }
