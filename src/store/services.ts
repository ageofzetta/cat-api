import { ActionTree } from "vuex";
import { AxiosResponse } from "axios";
import { CatImage, IRootState } from "./types";
import * as Namespace from "@/namespaces";
import { CatState } from "./types";
import axios from "../services/AxiosInstance";

const services: ActionTree<CatState, IRootState> = {
  [Namespace.SERVICE_REQ_CAT_IMAGES]: async ({
    getters,
  }): Promise<CatImage[]> => {
    const { currentPage, itemsPerPage }: CatState["navigation"] = getters[
      Namespace.GET_NAVIGATION
    ];
    const endpoint = `/images/search?limit=${itemsPerPage}&page=${currentPage}&order=Desc`;
    const res: AxiosResponse<CatImage[]> = await axios.get(endpoint);
    return res.data;
  },
  [Namespace.SERVICE_REQ_CAT_IMAGE]: async (
    context,
    payload: string
  ): Promise<CatImage> => {
    const endpoint = `/images/${payload}`;
    const res: AxiosResponse<CatImage> = await axios.get(endpoint);
    return res.data;
  },
};

export default services;
