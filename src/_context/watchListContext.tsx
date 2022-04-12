import React, { useReducer, createContext, useEffect } from "react";

import { IMoviesListItem } from "../types/movies.model";
import watchListReducer from "./watchListReducers";
import * as watchListActions from "../_constants/watchlistActions.constants";

interface IState
{
  watchlist: IMoviesListItem[] | [];
  addMovieToWatchlist: (movie: IMoviesListItem) => void;
  removeMovieFromWatchlist: (imdbID: string) => void;
}

const initialState: IState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist")!)
    : [],
  addMovieToWatchlist: () => undefined,
  removeMovieFromWatchlist: () => undefined,
};

const WatchListContext = createContext<IState>(initialState);

const WatchListProvider: React.FC<unknown> = (props) =>
{
  const [state, dispatch] = useReducer(watchListReducer, initialState);

  useEffect(() =>
  {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
  }, [state]);

  const addMovieToWatchlist = (movie: IMoviesListItem) =>
  {
    dispatch({ type: watchListActions.ADD_TO_WATCHLIST, payload: movie });
  };

  const removeMovieFromWatchlist = (imdbID: string) =>
  {
    dispatch({ type: watchListActions.REMOVE_FROM_WATCHLIST, payload: imdbID });
  };

  return (
    <WatchListContext.Provider
      {...props}
      value={{
        watchlist: state.watchlist,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
      }}
    ></WatchListContext.Provider>
  );
};

export { WatchListContext, WatchListProvider };