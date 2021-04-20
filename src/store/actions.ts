import { ActionTree, ActionContext } from "vuex";
import { IRootState, CatState, CatImage } from "@/store/types";
import * as Namespace from "@/namespaces";
import services from "@/store/services";

const actions: ActionTree<CatState, IRootState> = {
  ...services,
  [Namespace.ORQST_REFRESH_CAT_IMAGES]: async ({
    state,
    dispatch,
    commit,
  }: ActionContext<CatState, IRootState>): Promise<CatState> => {
    const allCatImages: CatImage[] = await dispatch(
      Namespace.SERVICE_REQ_CAT_IMAGES
    );
    commit(Namespace.MTT_CAT_IMAGES, allCatImages);
    return state;
  },
  [Namespace.ORQST_REFRESH_SELECTED_CAT]: async (
    { state, dispatch, commit }: ActionContext<CatState, IRootState>,
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
  }: ActionContext<CatState, IRootState>): Promise<CatState> => {
    const oldNavigation: CatState["navigation"] =
      getters[Namespace.GET_NAVIGATION];
    const { nextPage, currentPage, prevPage } = oldNavigation;
    if (!nextPage) return state;
    const current = currentPage + 1;
    const newNavigation: CatState["navigation"] = {
      ...oldNavigation,
      nextPage: current + 1,
      currentPage: current,
      prevPage: current - 1,
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
  }: ActionContext<CatState, IRootState>): Promise<CatState> => {
    const oldNavigation: CatState["navigation"] =
      getters[Namespace.GET_NAVIGATION];
    const { nextPage, currentPage, prevPage } = oldNavigation;
    if (prevPage === null) return state;
    const current = currentPage > 1 ? currentPage - 1 : currentPage;

    const newNavigation: CatState["navigation"] = {
      ...oldNavigation,
      nextPage: current + 1,
      currentPage: current,
      prevPage: current > 0 ? current - 1 : null,
    };
    commit(Namespace.MTT_NAVIGATION, newNavigation);
    await dispatch(Namespace.ORQST_REFRESH_CAT_IMAGES);
    return state;
  },
};

export default actions;
