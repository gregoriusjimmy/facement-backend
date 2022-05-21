import { TransactionType } from '@prisma/client'
import prisma from '../../utils/usePrisma'

const topUp = async ({ accountId, amount }: { accountId: number; amount: number }) => {
  const createdTransaction = createTransaction(accountId, amount, 'ADD')
  const updatedAccount = addAccountBalance(accountId, amount)
  const [transaction] = await prisma.$transaction([createdTransaction, updatedAccount])
  return transaction
}

const createTransaction = (accountId: number, amount: number, type: TransactionType) => {
  return prisma.transaction.create({
    data: {
      amount,
      type,
      accountId,
    },
  })
}

const addAccountBalance = (accountId: number, amount: number) => {
  return prisma.account.update({
    where: {
      id: accountId,
    },
    data: {
      balance: {
        increment: amount,
      },
    },
  })
}

const subtractAccountBalance = async (accountId: number, amount: number) => {
  // TODO: add decrement validation
  return prisma.account.update({
    where: {
      id: accountId,
    },
    data: {
      balance: {
        decrement: amount,
      },
    },
  })
}

export default { topUp, addAccountBalance, subtractAccountBalance, createTransaction }
