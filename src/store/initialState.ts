import { CatState } from "./types";

export default {
  cats: [],
  images: [],
  selectedCat: null,
  navigation: {
    currentPage: 0,
    nextPage: 1,
    prevPage: null,
    itemsPerPage: 10,
  },
} as CatState;
