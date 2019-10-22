// import database from '../../../db/database';

const state = {
  adventures: [],
};

const actions = {
  adventureFetchAllAction({ commit }) {
    // fetch data from sqlite
    // async await before commit

    // const allAdventures = await database('adventures')
    //   .select()
    //   .then(adventures => {
    //     console.log('advFetchAll adventures', adventures);
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   });
    commit('ADVENTURE_FETCH_ALL_MUTATION', allAdventures);
  },
  adventureAddAction({ commit }, payload) {
    // send data to sqlite
    // async await before commit to receive id

    // const newAdventure = await database('adventures')
    //   .insert(payload)
    //   .then(returnedValue => {
    //     console.log('advAddAction returnedValue', returnedValue);
    //     returnedValue
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   });
    commit('ADVENTURE_ADD_MUTATION', payload);
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

// return knex
//   .table('contacts').insert({ idcompany, email, name, telephone })
//   .then((value) => value)
//   .catch(error => {
//     console.log(error)
//   })
