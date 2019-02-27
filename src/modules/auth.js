import axios from '../helpers/axios-auth'
import globalAxios from 'axios'
import router from '../router'

const state = {
  idToken: null,
  userId: null,
  user: null
};

const mutations = {
  authUser(state, userData) {
    state.idToken = userData.token;
    state.userId = userData.userId;
  },
  storeUser(state, user) {
    state.user = user;
  },
  clearAuthData(state) {
    state.idToken = null;
    state.userId = null;
  }
};

const actions = {
  setLogoutTimer({ commit }, expirationTime) {
    setTimeout(() => {
      commit("clearAuthData");
    }, expirationTime * 1000);
  },
  signup({ commit, dispatch }, authData) {
    return axios.post("/signupNewUser?key=AIzaSyCkR9CgnuOPeaOvqqAaZFX8BN7It7sOHmg", {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        console.log(res);
        commit("authUser", {
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
        dispatch("storeUser", authData);
        dispatch("setLogoutTimer", res.data.expiresIn);
      })
      .catch(error => console.log(error));
  },
  login({ commit, dispatch }, authData) {
    return axios.post("/verifyPassword?key=AIzaSyCkR9CgnuOPeaOvqqAaZFX8BN7It7sOHmg", {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        console.log(res);
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("expirationDate", expirationDate);

        commit("authUser", {
          token: res.data.idToken,
          userId: res.data.localId
        });
        dispatch("setLogoutTimer", res.data.expiresIn);
      })
      .catch(error => console.log(error));
  },
  tryAutoLogin({ commit }) {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const expirationDate = localStorage.getItem("expirationDate");
    const now = new Date();
    if (now >= expirationDate) {
      return;
    }
    const userId = localStorage.getItem("userId");
    commit("authUser", {
      token: token,
      userId: userId
    });
  },
  logout({ commit }) {
    commit("clearAuthData");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.replace("/signin");
  },
  storeUser({ commit, state }, userData) {
    if (!state.idToken) {
      return;
    }
    globalAxios.put(`users/${state.userId}.json?auth=${state.idToken}`, userData)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  },
  fetchUser({ commit, state }) {
    if (!state.idToken) {
      return;
    }
    globalAxios.get(`users/${state.userId}.json?auth=${state.idToken}`)
      .then(({ data }) => {
        commit("storeUser", data)
        console.log('USER STORED!',data)
      })
      .catch(error => console.log(error));
  }
};

const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.idToken !== null;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
