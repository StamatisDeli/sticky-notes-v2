import axios from "../helpers/axios-auth";
import globalAxios from "axios";
import router from "../router";

const state = {
  idToken: null,
  userId: null,
  user: {
    type: Object,
    default: {}
  },
  responseMsg:{
    type: String,
    default: ""
  }
};

const mutations = {
  AUTH_USER(state, userData) {
    state.idToken = userData.token;
    state.userId = userData.userId;
  },
  STORE_USER(state, user) {
    state.user = user;
  },
  CLEAR_AUTH_DATA(state) {
    state.idToken = null;
    state.userId = null;
    state.user = {};
  },
  SET_MESSAGE(state, message){
    state.responseMsg = message
  }
};

const actions = {
  setLogoutTimer({ commit }, expirationTime) {
    setTimeout(() => {
      commit("CLEAR_AUTH_DATA");
    }, expirationTime * 1000);
  },
  signup({ commit, dispatch }, authData) {
    return axios
      .post("/signupNewUser?key=AIzaSyCkR9CgnuOPeaOvqqAaZFX8BN7It7sOHmg", {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        console.log(res);

        commit("AUTH_USER", {
          token: res.data.idToken,
          userId: res.data.localId
        });

        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        );

        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch("setLogoutTimer", res.data.expiresIn);
        return dispatch("storeUserDB", authData);
      })
      .catch(error => {
        if(error.response.data.error.message==='INVALID_PASSWORD'){
          commit("SET_MESSAGE", "Invalid Password")
          console.log('Wrong Password ')
          }
        if(error.response.data.error.message==='EMAIL_EXISTS'){
          commit("SET_MESSAGE", "Email already exists")
          console.log("Email already exists")
          }
        console.log('Error Logging In:', error.response.data.error.message)
      })
  },
  login({ commit, dispatch }, authData) {
    return axios
      .post("/verifyPassword?key=AIzaSyCkR9CgnuOPeaOvqqAaZFX8BN7It7sOHmg", {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        if(res.status===400) {
          NProgress.done()
          return
          }
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("expirationDate", expirationDate);

        commit("AUTH_USER", {
          token: res.data.idToken,
          userId: res.data.localId
        });
        dispatch("setLogoutTimer", res.data.expiresIn);
      })
      .catch(error => {
        if(error.response.data.error.message==='INVALID_PASSWORD'){
          commit("SET_MESSAGE", "Invalid Password")
          console.log('Wrong Password ')
          }
        if(error.response.data.error.message==='EMAIL_NOT_FOUND'){
          commit("SET_MESSAGE", "Email does not exist")
          console.log('Email does not exist')
          }
        console.log('Error Logging In:', error.response.data.error.message)
      })
  },
  tryAutoLogin({ commit }) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      return;
    }

    const expirationDate = localStorage.getItem("expirationDate");
    const now = new Date();

    if (now >= expirationDate) {
      commit("CLEAR_AUTH_DATA");
      return;
    }

    commit("AUTH_USER", {
      token: token,
      userId: userId
    });
  },
  logout({ commit }) {
    commit("CLEAR_AUTH_DATA");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.replace("/signin");
  },
  storeUserDB({ commit, state }, userData) {
    if (!state.idToken) {
      return;
    }
    return globalAxios
      .put(`users/${state.userId}.json?auth=${state.idToken}`, userData)
      .then(res => {
        console.log("STORED USER TO DB", res);
      })
      .catch(error => console.log(error));
  },
  fetchUser({ commit, state }) {
    if (!state.idToken) {
      return;
    }
    return globalAxios
      .get(`users/${state.userId}.json?auth=${state.idToken}`)
      .then(({ data }) => {
        commit("STORE_USER", data);
        console.log("USER IN STORE!", data);
      })
      .catch(error => console.log(error));
  }
};

const getters = {
  user(state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.idToken !== null
  },
  responseMsg(state) {
    return state.responseMsg
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
