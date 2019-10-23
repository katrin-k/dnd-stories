import Vue from 'vue';
import Router from 'vue-router';

import AdventuresPage from '../pages/AdventuresPage.vue';

import LandingPage from '../components/LandingPage';
import ThingsIndex from '../components/ThingsIndex';
import BeingsIndex from '../components/BeingsIndex';
import PlacesIndex from '../components/PlacesIndex';

import AdventuresAll from '../components/AdventuresAll';
import AdventuresSingle from '../components/AdventuresSingle';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage,
    },
    {
      path: '/things',
      name: 'things-index',
      component: ThingsIndex,
    },
    {
      path: '/beings',
      name: 'beings-index',
      component: BeingsIndex,
    },
    {
      path: '/places',
      name: 'places-index',
      component: PlacesIndex,
    },
    {
      path: '/adventures',
      name: 'adventures-page',
      component: AdventuresPage,
      children: [{
        path: 'layout',
        name: 'adventures-layout',
        components: {
          sidebar: AdventuresAll,
          main: AdventuresSingle,
        }
      }]
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
