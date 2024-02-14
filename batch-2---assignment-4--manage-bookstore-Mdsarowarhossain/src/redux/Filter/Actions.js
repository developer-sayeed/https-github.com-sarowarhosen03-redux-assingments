import { FILTER__BOOK, SEARCH_BOOK } from "./Actiontypes";

export const setFilterBook = (featured) => {
  return { type: FILTER__BOOK ,payload: featured};
};

export const setSearch = (filterText) => {
  return { type: SEARCH_BOOK, filterText };
};
