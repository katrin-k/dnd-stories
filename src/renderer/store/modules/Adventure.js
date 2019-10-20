import database from '../../../db/database';

const state = {
  adventures: [],
};

const actions = {
  adventureFetchAllAction({ commit }) {
    // fetch data from sqlite
    // async await before commit
    database('adventures')
      .select()
      .from('adventures')
      .then(adventures => {
        console.log('advFetchAll adventures', adventures);
        return commit('ADVENTURE_FETCH_ALL_MUTATION', adventures);
      });
  },
  adventureAddAction({ commit }, payload) {
    // send data to sqlite
    // async await before commit to receive id
    database('adventures')
      .insert(payload)
      .into('adventures')
      .then(returnedValue => {
        console.log('advAddAction returnedValue', returnedValue);
        return commit('ADVENTURE_ADD_MUTATION', returnedValue);
      });
  },
  // adventureUpdateAction({ commit }, payload) {
  //   commit("ADVENTURE_ADD_MUTATION", payload);
  //   // send data to sqlite
  // },
  // adventureDeleteAction({ commit }, payload) {
  //   commit("ADVENTURE_ADD_MUTATION", payload);
  //   // send data to sqlite
  // }
};

const mutations = {
  ADVENTURE_FETCH_ALL_MUTATION(state, allAdventures) {
    return (state.adventures = [...allAdventures]);
  },
  ADVENTURE_ADD_MUTATION(state, newAdventure) {
    return (state.adventures = [...state.adventures, newAdventure]);
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
