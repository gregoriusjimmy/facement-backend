import { Request } from 'express'

export interface ICustomRequest<T> extends Request {
  body: T
}

export type TAccountModel = {
  email: string
  password: string
  phoneNumber: string
  photo: string
}

export interface IContextSchema {
  context: {
    token: string
  }
}

export type TTokenPayload = {
  email: string
}

export type TransactionType = 'ADD' | 'SUBTRACT'
