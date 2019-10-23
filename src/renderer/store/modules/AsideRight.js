const state = {
  currentComponent: null
};

const actions = {
  asideRightDisplayComponent({ commit }, componentName) {
    commit('ASIDE_RIGHT_DISPLAY_COMPONENT_MUTATION', componentName);
  }
};

const mutations = {
  ASIDE_RIGHT_DISPLAY_COMPONENT_MUTATION(state, componentName) {
    state.currentComponent = componentName;
  },
};

export default {
  state,
  actions,
  mutations,
};
