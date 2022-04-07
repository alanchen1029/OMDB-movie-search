import React, { useState, useEffect } from 'react';
import axios from "axios";

import { SearchBar, MoviesList, MovieDetails } from './components';
import { IMoviesListItem } from '../types/movies.model';

const MovieSearchMain = (): JSX.Element =>
{
  const [selectedMovieID, setSelectedMovieID] = useState("");
  const [moviesList, setMoviesList] = useState<IMoviesListItem[] | []>([]);

  const requestMovies = () =>
  {
    axios.get(`${BASE_URL}?s=star wars&page=1&apikey=${API_KEY}`)
      .then((response) =>
      {
        // handle success
        console.log(response);
        setMoviesList([...moviesList, ...response.data.Search]);
      })
      .catch((error) =>
      {
        // handle error
        console.log(error);
      });
  };

  useEffect(() =>
  {
    requestMovies();
  }, []);

  const getSelectedMovieID = (movieID: string) =>
  {
    setSelectedMovieID(movieID);
  }

  console.log(selectedMovieID);

  return (
    <>
      <SearchBar />
      <MoviesList
        moviesList={moviesList}
        getSelectedMovieID={getSelectedMovieID}
      />
      <MovieDetails movieID={selectedMovieID} />
    </>
  );
}

export default MovieSearchMain;