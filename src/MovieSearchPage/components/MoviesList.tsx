import React from 'react';
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

import { IMoviesListItem } from '../../types/movies.model';
import PosterNotAvailable from "../../assets/images/no-image-available.jpeg";
import Button from '@mui/material/Button';

interface IMoviesList
{
  isMovieListLoading: boolean;
  hasLoadedAll: boolean;
  moviesList: IMoviesListItem[] | [];
  selectedMovieID: string;
  getSelectedMovieID: (movieID: string) => void;
  requestMoreMovieListItems: () => void;
}

export const MoviesList = (
  {
    isMovieListLoading,
    hasLoadedAll,
    moviesList,
    selectedMovieID,
    getSelectedMovieID,
    requestMoreMovieListItems
  }: IMoviesList): JSX.Element =>
{
  const moviesListLoadingView = () =>
  {
    return (
      <Skeleton count={10} height={145} />
    )
  };

  const requestMoreButton = () =>
  {
    return (
      <div className="action-container">
        <Button
          variant="outlined"
          color="inherit"
          onClick={requestMoreMovieListItems}
          disabled={isMovieListLoading}
        >
          Search More
        </Button>
      </div>
    )
  }

  return (
    <div className='movies-list'>
      {moviesList.length > 0 ?
        <InfiniteScroll
          dataLength={moviesList.length}
          next={requestMoreMovieListItems}
          hasMore={!hasLoadedAll}
          height={"calc(100vh - 120px)"}
          loader={moviesListLoadingView()}
          endMessage={
            <p className="reach-end-hint">
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="movies-quantity">
            {moviesList.length} RESULTS
            {!hasLoadedAll && ` , SCROLL DOWN ${moviesList.length < 10 ? "OR CLICK BUTTON" : ""} TO FIND MORE.`}
          </div>
          {moviesList.map((movie) =>
          (
            <div
              className={`movie-item ${selectedMovieID === movie.imdbID ? "selected" : ""}`}
              key={movie.imdbID}
              onClick={() => getSelectedMovieID(movie.imdbID)}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : PosterNotAvailable}
                alt="movie poster"
                className="movie-poster"
              />
              <div className="movie-info">
                <span className="movie-title">{movie.Title}</span>
                <span className="movie-year">{movie.Year}</span>
              </div>
            </div>
          )
          )}
          {!hasLoadedAll && moviesList.length < 10 &&
            requestMoreButton()
          }
        </InfiniteScroll>
        :
        <div className="movies-quantity">
          {isMovieListLoading ?
            <>
              SEARCHING....
              {moviesListLoadingView()}
            </>
            :
            `NO RESULTS MATCH, CHANGE SEARCH SETTINGS ${!hasLoadedAll ? "OR SEARCH MORE" : ""}.`
          }
          {!hasLoadedAll &&
            requestMoreButton()
          }
        </div>
      }
    </div>
  );
}