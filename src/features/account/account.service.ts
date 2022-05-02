import prisma from '../../utils/usePrisma'

const isAccountExist = async ({ email }: { email: string }) => {
  const account = await prisma.account.findUnique({ where: { email } })
  return account ? true : false
}

export default { isAccountExist }
