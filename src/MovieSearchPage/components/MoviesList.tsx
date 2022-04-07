import React from 'react';

import { IMoviesListItem } from '../../types/movies.model';

interface IMoviesList
{
  moviesList: IMoviesListItem[] | [];
  getSelectedMovieID: (movieID: string) => void;
}

export const MoviesList = ({ moviesList, getSelectedMovieID }: IMoviesList): JSX.Element =>
{
  return (
    <div className='movies-list'>
      {moviesList.map((movie) =>
      (
        <div
          className="list-item"
          key={movie.imdbID}
          onClick={() => getSelectedMovieID(movie.imdbID)}
        >
          <img src={movie.Poster} alt="movie poster" />
          {movie.Title}
        </div>
      )
      )}
    </div>
  );
}