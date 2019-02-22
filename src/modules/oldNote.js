const state = {
  oldNote: {
    type: Object,
    default: {}
  }
}

const getters = {
  oldNote: state => state.oldNote
}

const mutations = {
  SET_OLD_NOTE (state, oldNote) {
    state.oldNote = oldNote
  }
}

const actions = {
  sendNote ({ commit }, oldNote) {
    commit('SET_OLD_NOTE', oldNote)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
