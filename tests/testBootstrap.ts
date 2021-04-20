/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLocalVue, RouterLinkStub, MountOptions } from "@vue/test-utils";
import Vuex, { StoreOptions, Store, Dispatch } from "vuex";
import Vue from "vue";
import Router from "vue-router";
const localVue = createLocalVue();
localVue.filter("toMoney", (value: string) => value);
localVue.use(Vuex);
localVue.use(Router);
export const storeFactory = (
  storeOptions = ({
    state: {},
    getters: {},
    actions: {},
    mutations: {},
  } as StoreOptions<any>) as any
): Store<any> => new Vuex.Store(storeOptions);
export const mockstoreFactory = (): { dispatch: Dispatch } => ({
  dispatch: jest.fn(() => Promise.resolve()),
});
export interface IMountingOptions<V extends Vue> extends MountOptions<V> {
  store: Store<any>;
  sync?: boolean;
}
export const mountingOptionsFactory = (
  ProvidedRouter: Router | false = false
): IMountingOptions<Vue> => ({
  sync: false,
  localVue,
  store: storeFactory() as Store<any>,
  provide: () => ({
    $validator: "",
  }),
  mocks: {
    $store: {},
    assets: () => "assets",
    // $route,
  },
  stubs: {
    RouterLink: RouterLinkStub,
  },
  router: ProvidedRouter || new Router(),
});
