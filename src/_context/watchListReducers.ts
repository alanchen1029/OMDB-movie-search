import { WatchListAction } from "../types/actions";
import { IMoviesListItem } from "../types/movies.model";
import * as watchListActions from "../_constants/watchlistActions.constants";

export default function watchListReducer(state: any, action: WatchListAction)
{
  switch (action.type)
  {
    case watchListActions.ADD_TO_WATCHLIST:
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case watchListActions.REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie: IMoviesListItem) => movie.imdbID !== action.payload
        ),
      };
    default:
      return state;
  }
};
