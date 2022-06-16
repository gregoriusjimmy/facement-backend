import * as faceapi from 'face-api.js'
import * as canvas from 'canvas'
import path from 'path'
import '@tensorflow/tfjs-node'

const loadModels = async () => {
  const MODELS_LOCATION = path.join(__dirname, '..', '..', 'models')
  await faceapi.nets.tinyFaceDetector.loadFromDisk(MODELS_LOCATION)
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_LOCATION)
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_LOCATION)
}

const faceApiSetup = async () => {
  try {
    // patch nodejs environment, we need to provide an implementation of
    // HTMLCanvasElement and HTMLImageElement
    const { Canvas, Image, ImageData } = canvas
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData } as any)
    await loadModels()
  } catch (error) {
    console.error(error)
  }
}

export default faceApiSetup
