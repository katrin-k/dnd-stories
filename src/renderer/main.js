import Vue from 'vue';

import App from './App';
import router from './router';
import store from './store';

import './assets/styles/main.scss';

// hopefully temporary: globally register components in order to display them
// on the right side slot
import TestSlotOne from './components/TestSlotOne.vue';
import TestSlotTwo from './components/TestSlotTwo.vue';

Vue.component('test-slot-one', TestSlotOne)
Vue.component('test-slot-two', TestSlotTwo)
// End of global register

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.config.devtools = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
