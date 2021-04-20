import Vue from "vue";
import { MutationTree } from "vuex";
import deepClone from "lodash.clonedeep";
import * as Namespace from "@/namespaces";
import { CatState, CatBreed } from "@/store/types";

const mutations: MutationTree<CatState> = {
  [Namespace.MTT_CAT_IMAGES]: (state: CatState, payload: CatBreed[]): void => {
    Vue.set(state, "images", payload.slice() as CatBreed[]);
  },
  [Namespace.MTT_SELECTED_CAT]: (state: CatState, payload: CatBreed): void => {
    Vue.set(state, "selectedCat", deepClone(payload));
  },
  [Namespace.MTT_NAVIGATION]: (
    state: CatState,
    payload: CatState["navigation"]
  ): void => {
    Vue.set(state, "navigation", deepClone(payload));
  },
};

export default mutations;
