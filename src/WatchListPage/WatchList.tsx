import React, { useContext } from 'react';
import Button from '@mui/material/Button';

import { WatchListContext } from '../_context/watchListContext';
import PosterNotAvailable from "../assets/images/no-image-available.jpeg";
import CtaPanel from '../_components/CtaPanel';
import { CtaMessagesEnum } from '../types/movies.model';
import Header from '../_components/GeneralHeader';

export const WatchlistPage = (): JSX.Element =>
{
  const { watchlist, removeMovieFromWatchlist } = useContext(WatchListContext);

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="watchlist-wrapper">
          <div className="grid-x grid-margin-x">
            {watchlist.length > 0 ?
              watchlist.map((movie) =>
              {
                return (
                  <div className="cell medium-4 small-12 small" key={movie.imdbID}>
                    <div className="watchlist-item">
                      <img
                        src={movie.Poster !== "N/A" ? movie.Poster : PosterNotAvailable}
                        alt="movie poster"
                        className="movie-poster"
                      />
                      <div className="movie-info">
                        <span className="movie-title">{movie.Title}</span>
                        <span className="movie-year">{movie.Year}</span>
                      </div>
                      <Button
                        variant="outlined"
                        color={"error"}
                        onClick={() => removeMovieFromWatchlist(movie.imdbID)}
                      >
                        Remove From Watchlist
                      </Button>
                    </div>
                  </div>
                )
              })
              :
              <CtaPanel ctaMessage={CtaMessagesEnum.EmptyWatchlist} />
            }
          </div>
        </div>
      </div>
    </>
  )
}