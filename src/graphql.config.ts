import {
  ApolloClient,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { cache } from './cache'

// Instantiate required constructor fields
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_ENDPOINT,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token')
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM2NDY1YTk2OTRjZTY2OTY5Zjk2ZjkwODA1MTA3MTY3OTA3YmJjZWE3ZjA4YmEzMWY5OWNhMTk1ZTdlZWRkZjRlM2E2YmY1YTY3MGU4ZTg0In0.eyJhdWQiOiI0MjM1IiwianRpIjoiYzY0NjVhOTY5NGNlNjY5NjlmOTZmOTA4MDUxMDcxNjc5MDdiYmNlYTdmMDhiYTMxZjk5Y2ExOTVlN2VlZGRmNGUzYTZiZjVhNjcwZThlODQiLCJpYXQiOjE2MDM2ODQ3MzAsIm5iZiI6MTYwMzY4NDczMCwiZXhwIjoxNjM1MjIwNzMwLCJzdWIiOiI3NjU5NTMiLCJzY29wZXMiOltdfQ.wg-n-pPafg8qpFeBIl9YO2UQ3x_T3EhUErUlX5xcg120iDPi9X4iObYI4w8K9aJPRuDxt7hmCwUDHi1V4vV-gQ8si0baS1M18jU8s3gbSBBk5DltRg_YE-0YyVvvy6sJikIOxhzKtfmNHqXQw2p3D1RFVGNcfyAByz3L_d4rubEeAAJOmLYaPjbTwr4-QzXSWavI2cxhbCMsqk8VflYHJvuW0_yu1zyW-ZJnslx2DXZk5Pv-TE2lr340RwpDHKR06zpkUqbguaM3Kpl5a8S5zdPtbx_BTN9DYBgJN7LjLMMKGj1pK5NBJOQTM_FLUUuCB6aaIIdBR-nGprGRSXDTa6lDqUX23WocMKqy1C1p4tGEOYJrSZRYk4YeMtqIILkaNgQqKZisEfLNPRtTD7-IdQc8zyTr04vLltXNotnPrePHMpT2yH1cELQmFTEh2mFxBYwlBFfSZsSeF-txXpbFPpBjK885DZ5UAQIImbY-vlMfi-p-ob4jPXbeN_RAceolRKx6h-e1Qaly0zOZttJj7P2BOEKlufHwuRy5ZQ_anKtM097M36sxOCCcO3_h0z0GDQ0LPS4Dvf2BhxjL0b2cPGxgilr1HuHoLf3N8eiG5DEo_iLLSdfJkZTI5luGtlh3-NSzE5ysGL6hjEXTrDEV5aQC_b3n4Xrw2-D4nYhpW7c&token_type=Bearer&expires_in=31536000'

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // 'Authorization': token ? `Bearer ${token}` : null,
    },
  }
})

const clientConfig: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: authLink.concat(httpLink),

  // Provide some optional constructor fields
  queryDeduplication: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  connectToDevTools: process.env.NODE_ENV !== 'production',
})

export default clientConfig
