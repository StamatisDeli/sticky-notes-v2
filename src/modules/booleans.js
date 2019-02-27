const state = {
  isNew: {
    type: Boolean,
    default: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
}

const getters = {
  isNew: state => state.isNew,
  isLoading: state => state.isLoading
}

const mutations = {
  SET_NEW (state, isNew) {
    state.isNew = isNew
  },
  SET_LOADING (state, isLoading) {
    state.isLoading = isLoading
  }
}

const actions = {
  setNew ({ commit }) {
    commit('SET_NEW')
  },
  setLoading ({ commit }) {
    commit('SET_LOADING')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
