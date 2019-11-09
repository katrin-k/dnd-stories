const state = {
  currentComponent: null,
  slotId: null
};

const actions = {
  dynamicSlotDisplayComponent({ commit }, args) {
    commit('DYNAMIC_SLOT_DISPLAY_COMPONENT', { ...args });
  }
};

const mutations = {
  DYNAMIC_SLOT_DISPLAY_COMPONENT(state, payload) {
    state.currentComponent = payload.componentName;
    state.slotId = payload.slotId;
  },
};

export default {
  state,
  actions,
  mutations,
};
