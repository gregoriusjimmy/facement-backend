import httpStatus from 'http-status'
import * as faceapi from 'face-api.js'
import * as canvas from 'canvas'
import ApiError from '../../utils/ApiError'

const ihPhotoValid = async ({ photo }: { photo: string }) => {
  try {
    const image = (await canvas.loadImage(photo)) as any
    const fullFaceDescription = await faceapi
      .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()

    if (fullFaceDescription) return true
    return false
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Something went wrong'
    )
  }
}

export default { ihPhotoValid }
