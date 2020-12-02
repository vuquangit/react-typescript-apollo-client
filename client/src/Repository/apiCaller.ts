import axios, { Method, AxiosPromise } from 'axios'

// axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.headers.common['Accept'] = 'application/json'

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert('You need login!')
    } else if (error.response && error.response.status === 400) {
      alert('Your data is incorrect!')
    } else if (error.response && error.response.status === 422) {
      alert('Your data is incorrect! Please check and try again')
    } else {
      alert('Got something wrong on our system. Please reload and try again!')
    }

    return Promise.reject(error)
  }
)

const apiCaller = (
  method: Method = 'GET',
  url = '',
  data = null,
  params = null
): AxiosPromise<any> => {
  return axios({
    method,
    url,
    data,
    params,
  })
}

export default apiCaller
