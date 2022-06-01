import { TAccountModel } from '../../types/common'
import prisma from '../../utils/usePrisma'

const findAccountByEmail = (email: string) => {
  return prisma.account.findUnique({ where: { email } })
}

const findAccountByPhoneNumber = (phoneNumber: string) => {
  return prisma.account.findUnique({ where: { phoneNumber } })
}

const createAccount = ({ email, password, phoneNumber, photo }: TAccountModel) => {
  return prisma.account.create({ data: { email, photo, password: password, phoneNumber } })
}

export default { findAccountByEmail, createAccount, findAccountByPhoneNumber }
