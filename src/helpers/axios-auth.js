// NOT SURE I WILL USE THIS - NOT USED YET
import axios from "axios";
import store from '../store.js'

const instance = axios.create({
  baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty"
});

// before a request is made start the nprogress
instance.interceptors.request.use(
  config => {
    NProgress.start();
    store.commit("SET_LOADING", true);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// before a response is returned stop nprogress
instance.interceptors.response.use(
  response => {
    NProgress.done();
    store.commit("SET_LOADING", false);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance;
