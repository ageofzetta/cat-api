import { ActionTree, ActionContext } from "vuex";
import { CatState, CatImage } from "@/store/types";
import * as Namespace from "@/namespaces";
import services from "@/store/services";

const buildNavigation = (currentPage: number): CatState["navigation"] => {
  const prevPage = currentPage - 1 < 0 ? null : currentPage - 1;
  return {
    currentPage,
    prevPage,
    nextPage: currentPage + 1,
    itemsPerPage: 0,
  };
};
const actions: ActionTree<CatState, CatState> = {
  ...services,
  [Namespace.ORQST_REFRESH_CAT_IMAGES]: async ({
    state,
    dispatch,
    getters,
    commit,
  }: ActionContext<CatState, CatState>): Promise<CatState> => {
    const allCatImages: CatImage[] = getters[Namespace.GET_CAT_IMAGES];
    const { currentPage, itemsPerPage }: CatState["navigation"] = getters[
      Namespace.GET_NAVIGATION
    ];
    const totalPages = allCatImages.length / itemsPerPage;
    if (totalPages > currentPage) {
      return state;
    }
    const newCatImages: CatImage[] = await dispatch(
      Namespace.SERVICE_REQ_CAT_IMAGES
    );
    commit(Namespace.MTT_CAT_IMAGES, newCatImages);
    return state;
  },
  [Namespace.ORQST_REFRESH_SELECTED_CAT]: async (
    { state, dispatch, commit }: ActionContext<CatState, CatState>,
    payload: string
  ): Promise<CatState> => {
    const selectedCat: CatImage = await dispatch(
      Namespace.SERVICE_REQ_CAT_IMAGE,
      payload
    );
    commit(Namespace.MTT_SELECTED_CAT, selectedCat);
    return state;
  },
  [Namespace.ACTION_NEXT_PAGE]: async ({
    state,
    dispatch,
    commit,
    getters,
  }: ActionContext<CatState, CatState>): Promise<CatState> => {
    const oldNavigation: CatState["navigation"] =
      getters[Namespace.GET_NAVIGATION];
    const { currentPage } = oldNavigation;
    const current = currentPage + 1;
    const newNavigation: CatState["navigation"] = {
      ...buildNavigation(current),
      itemsPerPage: oldNavigation.itemsPerPage,
    };

    commit(Namespace.MTT_NAVIGATION, newNavigation);
    await dispatch(Namespace.ORQST_REFRESH_CAT_IMAGES);
    return state;
  },
  [Namespace.ACTION_PREV_PAGE]: async ({
    state,
    dispatch,
    commit,
    getters,
  }: ActionContext<CatState, CatState>): Promise<CatState> => {
    const oldNavigation: CatState["navigation"] =
      getters[Namespace.GET_NAVIGATION];
    const { currentPage, prevPage } = oldNavigation;
    if (prevPage === null) return state;
    const current = Math.max(currentPage - 1, 0);
    const newNavigation: CatState["navigation"] = {
      ...buildNavigation(current),
      itemsPerPage: oldNavigation.itemsPerPage,
    };
    commit(Namespace.MTT_NAVIGATION, newNavigation);
    await dispatch(Namespace.ORQST_REFRESH_CAT_IMAGES);
    return state;
  },
};

export default actions;
