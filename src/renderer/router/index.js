import Vue from "vue";
import Router from "vue-router";

import LandingPage from "../components/LandingPage";
import ThingsIndex from "../components/ThingsIndex";
import BeingsIndex from "../components/BeingsIndex";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: LandingPage
    },
    {
      path: "/things",
      name: "things-index",
      component: ThingsIndex
    },
    {
      path: "/beings",
      name: "beings-index",
      component: BeingsIndex
    },
    // {
    //   path: "/things/items",
    //   name: "things-items-index",
    //   component: require("@/components/ThingsItemsIndex").default
    // },
    // {
    //   path: "/things/items/:id",
    //   name: "things-items-single",
    //   component: require("@/components/ThingsItemsSingle").default
    // },
    // {
    //   path: "/things",
    //   name: "things-index",
    //   component: require("@/components/ThingsIndex").default
    // },
    // {
    //   path: "/things",
    //   name: "things-index",
    //   component: require("@/components/ThingsIndex").default
    // },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
