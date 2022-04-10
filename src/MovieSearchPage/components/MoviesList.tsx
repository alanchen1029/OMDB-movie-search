import React from 'react';
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

import { IMoviesListItem } from '../../types/movies.model';
import PosterNotAvailable from "../../assets/images/no-image-available.jpeg";

interface IMoviesList
{
  isMovieListLoading: boolean;
  searchedResultsQuantity: string;
  moviesList: IMoviesListItem[] | [];
  selectedMovieID: string;
  getSelectedMovieID: (movieID: string) => void;
  requestMoreMovieListItems: () => void;
}

export const MoviesList = ({ isMovieListLoading, searchedResultsQuantity, moviesList, selectedMovieID, getSelectedMovieID, requestMoreMovieListItems }: IMoviesList): JSX.Element =>
{
  const moviesListLoadingView = () =>
  {
    return (
      <Skeleton count={10} height={145} />
    )
  };

  return (
    <div className='movies-list'>
      {moviesList.length > 0 &&
        <InfiniteScroll
          dataLength={moviesList.length}
          next={requestMoreMovieListItems}
          hasMore={moviesList.length < parseInt(searchedResultsQuantity) ? true : false}
          height={"calc(100vh - 120px)"}
          loader={moviesListLoadingView()}
          endMessage={
            moviesList.length > 10 ?
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
              : null
          }
        >
          <div className="movies-quantity">
            {searchedResultsQuantity} RESULTS
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
        </InfiniteScroll>
      }
      {isMovieListLoading &&
        moviesListLoadingView()
      }
    </div>
  );
}