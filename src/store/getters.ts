import { GetterTree } from "vuex";
import { CatImage, IRootState } from "@/store/types";
import * as Namespace from "@/namespaces";
import { CatState, CatBreed } from "@/store/types";

const getters: GetterTree<CatState, IRootState> = {
  [Namespace.GET_CAT_IMAGES]: (state: CatState): CatImage[] => {
    return state.images;
  },
  [Namespace.GET_SELECTED_CAT]: (state: CatState): CatImage | null => {
    return state.selectedCat;
  },
  [Namespace.GET_NAVIGATION]: (state: CatState): CatState["navigation"] => {
    return state.navigation;
  },
};

export default getters;
