import axios from "axios";

const state = {
  notes: {
    type: Object,
    default: {},
    required: true
  }
};

const mutations = {
  SET_NOTES(state, notes) {
    state.notes = notes;
  }
};

const getters = {
  notes: state => state.notes
};

const actions = {
  getNotes({ commit, rootState }) {
    let userId = rootState.auth.userId;
    let idToken = rootState.auth.idToken;
    if (!userId) return;
    return axios
      .get(`users/${userId}/notes.json?auth=${idToken}`)
      .then(res => {
        const incoming = res.data;
        const notes = [];
        // converting object and
        // extracting firebase ids for manipulating existing notes
        for (let key in incoming) {
          const note = incoming[key];
          note.id = key;
          // OR:
          // incoming[key].id=key
          notes.push(note);
        }
        commit("SET_NOTES", notes);
        return notes;
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  },
  async deleteNote({ commit, rootState, dispatch }, note) {
    let id = note.id;
    let userId = rootState.auth.userId;
    let idToken = rootState.auth.idToken;

    await axios.delete(`users/${userId}/notes/${id}/.json?auth=${idToken}`, note)
      .then(response => {
        if (response.status === 200) {
          console.log("DELETED", response);
        }
      })
      .catch(error => {
        NProgress.done();
        console.log("Error: ", error);
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
