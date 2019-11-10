import Vue from 'vue';

import App from './App';
import router from './router';
import store from './store';
import Multiselect from 'vue-multiselect';

import './assets/styles/main.scss';
import 'vue-multiselect/dist/vue-multiselect.min.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.component('multiselect', Multiselect)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
