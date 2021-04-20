import { mountingOptionsFactory, storeFactory } from "../testBootstrap";
import {
  shallowMount,
  //   createLocalVue,
  //   RouterLinkStub,
  //   config,
  MountOptions,
} from "@vue/test-utils";
import Vue from "vue";
import CatComponent from "@/views/Cat.vue";
import * as Namespace from "@/namespaces";
import Router, { RouteConfig } from "vue-router";
import { routes as AppRoutes } from "@/router";
import { CatImage } from "@/store/types";

const CatGuard = jest.fn(() => Promise.resolve());
const stubbedRoutes = AppRoutes.slice().map((route: RouteConfig) => {
  return {
    ...route,
    beforeEnter: route.name === "Individual Cat" ? CatGuard : route.beforeEnter,
  };
});
const stubbedRouter = new Router({
  routes: stubbedRoutes,
});
const stubbedStore = {
  getters: {
    [Namespace.GET_SELECTED_CAT]: (): CatImage => {
      return {
        breeds: [],
        height: 10,
        width: 10,
        id: "abc",
        url: "",
      };
    },
  },
};

describe("Cat.vue", () => {
  let mountingOptions: MountOptions<Vue>;
  beforeEach(() => {
    mountingOptions = mountingOptionsFactory(stubbedRouter);
    mountingOptions.store = storeFactory(stubbedStore);
  });

  it("Mounts correctly", () => {
    const wrapper = shallowMount(CatComponent, mountingOptions);
    expect(wrapper).toBeDefined();
  });
  it("Should trigger guard", () => {
    stubbedRouter.push({ path: "/cats/abc" });
    expect(CatGuard).toHaveBeenCalledTimes(1);
  });
});
