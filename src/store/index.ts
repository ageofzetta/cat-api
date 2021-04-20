import deepClone from "lodash.clonedeep";
import { StoreOptions } from "vuex";
import initialState from "@/store/initialState";
import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";

import Vue from "vue";
import Vuex from "vuex";


import { CatState, IRootState } from "./types";

Vue.use(Vuex);

const ApplicationStore: StoreOptions<any> = {
  actions,
  getters,
  mutations,
  state: deepClone(initialState),
};
export default new Vuex.Store<any>(ApplicationStore);
