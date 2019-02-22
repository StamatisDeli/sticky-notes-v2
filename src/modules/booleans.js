const state = {
  isNew: {
    type: Boolean,
    default: true
  }
}

const getters = {
  isNew: state => state.isNew
}

const mutations = {
  SET_NEW (state, isNew) {
    state.isNew = isNew
  }
}

const actions = {
  setNew ({ commit }) {
    commit('SET_NEW')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
