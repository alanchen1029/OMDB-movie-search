import React, { useEffect, useState } from 'react';
import axios from "axios";

import { IMovieDetails } from '../../types/movies.model';

interface IMovieDetailsProps
{
  movieID: string;
}

export const MovieDetails = ({ movieID }: IMovieDetailsProps): JSX.Element =>
{
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();

  const requestMovieDetails = (movieID: string) =>
  {
    axios.get(`${BASE_URL}?i=${movieID}&apikey=${API_KEY}`)
      .then(function (response)
      {
        // handle success
        console.log(response);
        setMovieDetails(response.data);
      })
      .catch(function (error)
      {
        // handle error
        console.log(error);
      })
  };

  useEffect(() =>
  {
    if (movieID)
    {
      requestMovieDetails(movieID);
    }
  }, [movieID]);

  console.log(movieDetails);

  return (
    <div>
      {movieDetails && movieDetails.Actors}
    </div>
  );
}