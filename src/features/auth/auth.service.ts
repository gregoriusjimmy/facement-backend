import httpStatus from 'http-status'
import ApiError from '../../utils/ApiError'
import prisma from '../../utils/usePrisma'

const login = async ({ email, password }: { email: string; password: string }) => {
  const account = await prisma.account.findUnique({
    where: {
      email,
    },
  })

  if (!account || account.password === password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
  }

  return account
}
const isEmailExist = async ({ email }: { email: string }) => {
  const emailFound = await prisma.account.findUnique({ where: { email } })
  if (emailFound) throw new ApiError(httpStatus.BAD_GATEWAY, 'Email already exist')
  return false
}

const register = async ({
  email,
  password,
  phoneNumber,
  faceData,
}: {
  email: string
  password: string
  phoneNumber: string
  faceData: string
}) => {
  const newAccount = await prisma.account.create({ data: { email, faceData, password, phoneNumber } })
  return newAccount
}

export default { login, isEmailExist, register }
