import deepClone from "lodash.clonedeep";
import { mountingOptionsFactory, storeFactory } from "../testBootstrap";
import {
  shallowMount,
  //   createLocalVue,
  //   RouterLinkStub,
  //   config,
  MountOptions,
} from "@vue/test-utils";
import Vue from "vue";
import NavComponent from "@/components/Navigation.vue";
import * as Namespace from "@/namespaces";
import Router, { RouteConfig } from "vue-router";
import { routes as AppRoutes } from "@/router";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import { CatState } from "@/store/types";

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
const navigation: CatState["navigation"] = {
  currentPage: 0,
  prevPage: null,
  nextPage: 1,
  itemsPerPage: 10,
};
const stubbedStore = {
  getters: {
    [Namespace.GET_NAVIGATION]: getters[Namespace.GET_NAVIGATION],
  },
  mutations: {
    [Namespace.MTT_NAVIGATION]: mutations[Namespace.MTT_NAVIGATION],
  },
  actions: {
    [Namespace.ORQST_REFRESH_CAT_IMAGES]: jest.fn(() => Promise.resolve()),
    [Namespace.ACTION_NEXT_PAGE]: actions[Namespace.ACTION_NEXT_PAGE],
    [Namespace.ACTION_PREV_PAGE]: actions[Namespace.ACTION_PREV_PAGE],
  },
  state: {
    navigation,
  },
};

describe("Navigation.vue", () => {
  let mountingOptions: MountOptions<Vue>;
  beforeEach(() => {
    mountingOptions = mountingOptionsFactory(stubbedRouter);
    mountingOptions.store = storeFactory(stubbedStore);
  });

  it("Mounts correctly", () => {
    const wrapper = shallowMount(NavComponent, mountingOptions);
    expect(wrapper).toBeDefined();
  });

  it("It should navigate forward", () => {
    const mutationMockFn = jest.fn(() => Promise.resolve());
    const anotherStubbedStore = deepClone(stubbedStore);
    anotherStubbedStore.mutations[Namespace.MTT_NAVIGATION] = mutationMockFn;
    mountingOptions.store = storeFactory(anotherStubbedStore);
    const wrapper = shallowMount(NavComponent, mountingOptions);
    wrapper.find("[data-testid='button-next']").trigger("click");
    const state = {
      navigation: {
        currentPage: 0,
        itemsPerPage: 10,
        nextPage: 1,
        prevPage: null,
      },
    };
    const payload = {
      currentPage: 1,
      itemsPerPage: 10,
      nextPage: 2,
      prevPage: 0,
    };
    expect(mutationMockFn).toHaveBeenCalledWith(state, payload);
  });
  it("Store should navigate forward and backwards", () => {
    const { store } = mountingOptions;
    if (!store) throw new Error("No store defined");

    store.dispatch(Namespace.ACTION_NEXT_PAGE);
    store.dispatch(Namespace.ACTION_NEXT_PAGE);
    expect(store.state.navigation.currentPage).toBe(2);
    store.dispatch(Namespace.ACTION_PREV_PAGE);
    store.dispatch(Namespace.ACTION_PREV_PAGE);
    expect(store.state.navigation.currentPage).toBe(0);
  });
  it("Buttons should dispatch actions", () => {
    const dispatchNextMockFn = jest.fn(() => Promise.resolve());
    const dispatchPrevMockFn = jest.fn(() => Promise.resolve());
    const anotherStubbedStore = deepClone(stubbedStore);
    anotherStubbedStore.actions = {
      ...anotherStubbedStore.actions,
      [Namespace.ACTION_PREV_PAGE]: dispatchPrevMockFn,
      [Namespace.ACTION_NEXT_PAGE]: dispatchNextMockFn,
    };
    anotherStubbedStore.state = {
      navigation: {
        ...navigation,
        currentPage: 4,
        prevPage: 3,
        nextPage: 5,
      },
    };
    mountingOptions.store = storeFactory(anotherStubbedStore);
    const wrapper = shallowMount(NavComponent, mountingOptions);
    const nextBtn = wrapper.find("[data-testid='button-next']");
    nextBtn.trigger("click");
    nextBtn.trigger("click");
    expect(dispatchNextMockFn).toHaveBeenCalledTimes(2);
    const prevBtn = wrapper.find("[data-testid='button-prev']");
    prevBtn.trigger("click");
    prevBtn.trigger("click");
    expect(dispatchPrevMockFn).toHaveBeenCalledTimes(2);
  });
});
