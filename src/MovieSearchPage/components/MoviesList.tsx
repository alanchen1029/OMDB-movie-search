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
  searchedResultsQuantity: number;
  moviesList: IMoviesListItem[] | [];
  selectedMovieID: string;
  getSelectedMovieID: (movieID: string) => void;
  requestMoreMovieListItems: () => void;
}

export const MoviesList = (
  {
    isMovieListLoading,
    hasLoadedAll,
    searchedResultsQuantity,
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
            {!hasLoadedAll && " , SCROLL DOWN TO FIND MORE."}

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
          }
        </InfiniteScroll>
        :
        <div className="movies-quantity">
          {isMovieListLoading ? "SEARCHING...." : `NO RESULTS MATCH, CHANGE FILTER SETTINGS ${!hasLoadedAll ? "OR SEARCH MORE" : ""}.`}
        </div>
      }
      {isMovieListLoading && moviesListLoadingView()}
      {!hasLoadedAll &&
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
      }
    </div>
  );
}