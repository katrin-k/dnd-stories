import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

import LandingPage from '../components/LandingPage/LandingPage';
import AdventuresPage from '../pages/AdventuresPage';
import PlacesPage from '../pages/PlacesPage';
import ItemsPage from '../pages/ItemsPage';

import CreaturesIndex from '../components/Creatures/CreaturesIndex';

import ItemIndex from '../components/Items/ItemIndex';
import ItemDetail from '../components/Items/ItemDetail';

import PlaceIndex from '../components/Places/PlaceIndex';
import PlaceDetail from '../components/Places/PlaceDetail';

import AdventuresIndex from '../components/Adventures/AdventuresIndex';
import AdventuresShow from '../components/Adventures/AdventuresShow';

// Register components
import PlaceShow from '../components/Places/PlaceShow.vue';
import ItemShow from '../components/Items/ItemShow.vue';
Vue.component('place-show', PlaceShow);
Vue.component('item-show', ItemShow);

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
            sidebar: ItemIndex,
            main: ItemDetail
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
            sidebar: PlaceIndex,
            main: PlaceDetail
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
  to.path !== from.path && store.dispatch('dynamicSlotDisplayComponent', null);
  next();
});

export default router;
