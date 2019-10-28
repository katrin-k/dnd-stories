import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from '../components/LandingPage/LandingPage';
import AdventuresPage from '../pages/AdventuresPage';

import ThingsIndex from '../components/Things/ThingsIndex';
import BeingsIndex from '../components/Beings/BeingsIndex';
import PlacesIndex from '../components/Places/PlacesIndex';

import AdventuresIndex from '../components/Adventures/AdventuresIndex';
import AdventuresShow from '../components/Adventures/AdventuresShow';

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
        path: '/:id',
        name: 'adventures-single',
        components: {
          sidebar: AdventuresIndex,
          main: AdventuresShow,
        }
      }]
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
