import store from "@/store";
import * as Namespace from "@/namespaces";
import { NavigationGuardNext, Route } from "vue-router";

export const fetchCats = async (
  to: Route,
  from: Route,
  next: NavigationGuardNext
): Promise<void> => {
  await store.dispatch(Namespace.ORQST_REFRESH_CAT_IMAGES);
  return next();
};
export const fetchCat = async (
  to: Route,
  from: Route,
  next: NavigationGuardNext
): Promise<void> => {
  const { catID } = to.params;
  await store.dispatch(Namespace.ORQST_REFRESH_SELECTED_CAT, catID);
  return next();
};
