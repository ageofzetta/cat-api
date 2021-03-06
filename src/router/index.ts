import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import multiguard from "vue-router-multiguard";
import * as guards from "./guards";
import Home from "../views/Home.vue";
import Cat from "../views/Cat.vue";

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: multiguard([guards.fetchCats]),
  },
  {
    path: "/cats/:catID",
    name: "Individual Cat",
    component: Cat,
    beforeEnter: multiguard([guards.fetchCat]),
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
