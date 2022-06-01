import { TransactionType } from '@prisma/client'
import prisma from '../../utils/usePrisma'

const topUp = async ({ accountId, amount }: { accountId: number; amount: number }) => {
  const createdTransaction = createTransaction(accountId, amount, 'ADD')
  const updatedAccount = addAccountBalance(accountId, amount)
  const [transaction, account] = await prisma.$transaction([createdTransaction, updatedAccount])
  return { transaction, account }
}

const pay = async ({ accountId, amount }: { accountId: number; amount: number }) => {
  const createdTransaction = createTransaction(accountId, amount, 'SUBTRACT')
  const updatedAccount = subtractAccountBalance(accountId, amount)
  const [transaction, account] = await prisma.$transaction([createdTransaction, updatedAccount])
  return { transaction, account }
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

const subtractAccountBalance = (accountId: number, amount: number) => {
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

export default { topUp, pay, addAccountBalance, subtractAccountBalance, createTransaction }
