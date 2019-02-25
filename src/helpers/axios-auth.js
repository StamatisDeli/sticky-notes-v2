// NOT SURE I WILL USE THIS - NOT USED YET
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
})

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
  NProgress.start()
  return config
})

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
  NProgress.done()
  return response
})


// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance
