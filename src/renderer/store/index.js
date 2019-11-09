import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core'
import database from '../models/index'

import {
  createPersistedState,
} from 'vuex-electron';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [VuexORM.install(database), createPersistedState()],
  strict: process.env.NODE_ENV !== 'production',
});
