const state = {
  currentComponent: null
};

const actions = {
  dynamicSlotDisplayComponent({ commit }, componentName) {
    commit('DYNAMIC_SLOT_DISPLAY_COMPONENT', componentName);
  }
};

const mutations = {
  DYNAMIC_SLOT_DISPLAY_COMPONENT(state, componentName) {
    state.currentComponent = componentName;
  },
};

export default {
  state,
  actions,
  mutations,
};
