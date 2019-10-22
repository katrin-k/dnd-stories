const state = {
  adventures: [],
};

const actions = {
  adventureFetchAllAction({ commit }) {
    commit('ADVENTURE_FETCH_ALL_MUTATION', allAdventures);
  },
  adventureAddAction({ commit }, payload) {
    commit('ADVENTURE_ADD_MUTATION', payload);
  },
  // adventureUpdateAction({ commit }, payload) {
  //   commit("ADVENTURE_ADD_MUTATION", payload);
  // },
  // adventureDeleteAction({ commit }, payload) {
  //   commit("ADVENTURE_ADD_MUTATION", payload);
  // }
};

const mutations = {
  ADVENTURE_FETCH_ALL_MUTATION(state, allAdventures) {
    state.adventures = [...allAdventures];
  },
  ADVENTURE_ADD_MUTATION(state, newAdventure) {
    state.adventures = [...state.adventures, newAdventure];
  },
  // ADVENTURE_UPDATE_MUTATION(state, existingAdventure) {
  //   return (state.adventures[existingAdventure.id] = existingAdventure);
  // },
  // ADVENTURE_DELETE_MUTATION(state, adventureId) {
  //   const newState = { ...state.adventures };
  //   delete newState[adventureId];
  //   return newState;
  // }
};

export default {
  state,
  actions,
  mutations,
};
