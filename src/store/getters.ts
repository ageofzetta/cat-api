import { GetterTree } from "vuex";
import { CatImage, CatState } from "@/store/types";
import * as Namespace from "@/namespaces";

const getters: GetterTree<CatState, CatState> = {
  [Namespace.GET_CAT_IMAGES]: (state: CatState): CatImage[] => {
    return state.images;
  },
  [Namespace.GET_VISIBLE_CAT_IMAGE]: (state: CatState): CatImage[] => {
    const { currentPage, itemsPerPage } = state.navigation;
    const initialIndex = currentPage * itemsPerPage;
    const endIndex = initialIndex + itemsPerPage;
    return state.images.slice(initialIndex, endIndex);
  },
  [Namespace.GET_SELECTED_CAT]: (state: CatState): CatImage | null => {
    return state.selectedCat;
  },
  [Namespace.GET_NAVIGATION]: (state: CatState): CatState["navigation"] => {
    return state.navigation;
  },
};

export default getters;
