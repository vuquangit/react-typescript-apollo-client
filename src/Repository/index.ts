import { get } from 'lodash'
import UserRepository, { TStockRepository } from './userRepository'

export type IRepository = TStockRepository

const repositories = {
  stocks: UserRepository,
}

export default {
  get: (name: string): any => get(repositories, name),
}
