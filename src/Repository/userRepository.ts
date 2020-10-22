import { AxiosPromise } from 'axios'
import apiCaller from './apiCaller'

const resources = {
  userUrl: '/...',
}

Object.freeze(resources)

export default {
  fetchUser: (): AxiosPromise<any> => apiCaller('GET', resources.userUrl),
}

export type TStockRepository = {
  fetchUser: () => AxiosPromise<any>
}
