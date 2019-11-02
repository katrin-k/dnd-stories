import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

import LandingPage from '../components/LandingPage/LandingPage';
import AdventuresPage from '../pages/AdventuresPage';
import PlacesPage from '../pages/PlacesPage';

import ItemsIndex from '../components/Items/ItemsIndex';
import CreaturesIndex from '../components/Creatures/CreaturesIndex';

import PlacesIndex from '../components/Places/PlacesIndex';
import PlacesShow from '../components/Places/PlacesShow';

import AdventuresIndex from '../components/Adventures/AdventuresIndex';
import AdventuresShow from '../components/Adventures/AdventuresShow';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage,

    },
    {
      path: '/items',
      name: 'items-index',
      component: ItemsIndex,
    },
    {
      path: '/creatures',
      name: 'creatures-index',
      component: CreaturesIndex,
    },
    {
      path: 'places',
      name: 'places-page',
      component: PlacesPage,
      children: [{
        path: ':id',
        name: 'places-details',
        components: {
          sidebar: PlacesIndex,
          main: PlacesShow,
        }
      }]
    },
    {
      path: '/adventures',
      name: 'adventures-page',
      component: AdventuresPage,
      children: [{
        path: ':id',
        name: 'adventures-details',
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

router.beforeEach((to, from, next) => {
  to.name !== from.name
    && store.dispatch('dynamicSlotDisplayComponent', null);
  next();
})

export default router
