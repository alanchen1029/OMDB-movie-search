import { IMoviesListItem } from "./movies.model";

export type WatchListAction = {
  type: string;
  payload: IMoviesListItem | string;
};