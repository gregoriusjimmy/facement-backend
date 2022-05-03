import httpStatus from 'http-status'
import ApiError from '../../utils/ApiError'
import prisma from '../../utils/usePrisma'
import bcrypt from 'bcrypt'
import authUtil from './auth.util'

const login = async ({ email, password }: { email: string; password: string }) => {
  const account = await prisma.account.findUnique({
    where: {
      email,
    },
  })
  if (!account || account.password === password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
  }
  const token = authUtil.createToken(account.id.toString())
  return { account, token }
}

const register = async ({
  email,
  password,
  phoneNumber,
  photo,
}: {
  email: string
  password: string
  phoneNumber: string
  photo: string
}) => {
  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)
  const newAccount = await prisma.account.create({ data: { email, photo, password: hash, phoneNumber } })
  const token = authUtil.createToken(newAccount.email)
  return { newAccount, token }
}

export default { login, register }
