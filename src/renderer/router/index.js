import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

import LandingPage from '../components/LandingPage/LandingPage';
import AdventuresPage from '../pages/AdventuresPage';
import PlacesPage from '../pages/PlacesPage';
import ItemsPage from '../pages/ItemsPage';

import CreaturesIndex from '../components/Creatures/CreaturesIndex';

import ItemsIndex from '../components/Items/ItemsIndex';
import ItemsDetail from '../components/Items/ItemsDetail';

import PlacesIndex from '../components/Places/PlacesIndex';
import PlacesDetail from '../components/Places/PlacesDetail';

import AdventuresIndex from '../components/Adventures/AdventuresIndex';
import AdventuresShow from '../components/Adventures/AdventuresShow';

// Register components
import PlaceShow from '../components/Places/PlaceShow.vue';
Vue.component('place-show', PlaceShow);

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/creatures',
      name: 'creatures-index',
      component: CreaturesIndex
    },
    {
      path: '/items',
      name: 'items-page',
      component: ItemsPage,
      children: [
        {
          path: ':id',
          name: 'items-details',
          components: {
            sidebar: ItemsIndex,
            main: ItemsDetail
          }
        }
      ]
    },
    {
      path: 'places',
      name: 'places-page',
      component: PlacesPage,
      children: [
        {
          path: ':id',
          name: 'places-detail',
          components: {
            sidebar: PlacesIndex,
            main: PlacesDetail
          }
        }
      ]
    },
    {
      path: '/adventures',
      name: 'adventures-page',
      component: AdventuresPage,
      children: [
        {
          path: ':id',
          name: 'adventures-details',
          components: {
            sidebar: AdventuresIndex,
            main: AdventuresShow
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  to.name !== from.name && store.dispatch('dynamicSlotDisplayComponent', null);
  next();
});

export default router;
