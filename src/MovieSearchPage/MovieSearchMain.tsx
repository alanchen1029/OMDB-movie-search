import React, { useState, useEffect } from 'react';
import axios from "axios";

import { SearchBar, MoviesList, MovieDetails } from './components';
import { IMovieDetails, IMoviesListItem } from '../types/movies.model';

const MovieSearchMain = (): JSX.Element =>
{
  const [searchParams, setSearchParams] = useState("");
  const [isMovieListLoading, setIsMovieListLoading] = useState(false);
  const [searchedResultsQuantity, setSearchedResultsQuantity] = useState("");
  const [moviesList, setMoviesList] = useState<IMoviesListItem[] | []>([]);
  const [requestPageNum, setRequestPageNum] = useState(1);
  const [selectedMovieID, setSelectedMovieID] = useState("");
  const [isMovieDetailsLoading, setIsMovieDetailsLoading] = useState(false);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState<IMovieDetails | null>(null);

  const getSearchParamsChange = (params: string) =>
  {
    setSearchParams(params);
  }

  const requestMoviesList = (params: string, pageNum: number) =>
  {
    axios.get(`${BASE_URL}${params}&page=${pageNum}&apikey=${API_KEY}`)
      .then((response) =>
      {
        console.log(response);
        setSearchedResultsQuantity(response.data.totalResults);
        if (response.data.Search)
        {
          if (pageNum === 1)
          {
            setMoviesList(response.data.Search);
          } else
          {
            // concat moviesList with next page's data
            setMoviesList([...moviesList, ...response.data.Search]);
          }
        };
      })
      .catch((error) =>
      {
        console.log(error);

      })
      .then(() =>
      {
        setIsMovieListLoading(false);
      });
  };

  useEffect(() =>
  {
    // when search params change, reset page to 1
    if (searchParams.length > 0)
    {
      setIsMovieListLoading(true);
      setRequestPageNum(1);
      requestMoviesList(searchParams, 1);
    }
  }, [searchParams]);

  console.log(isMovieListLoading);

  // when scrolling down to the end of movie list, request another page of data
  const requestMoreMovieListItems = () =>
  {
    setRequestPageNum(requestPageNum + 1);
  };

  useEffect(() =>
  {
    if (searchParams.length > 0)
    {
      setIsMovieListLoading(true);
      requestMoviesList(searchParams, requestPageNum);
    }
  }, [requestPageNum]);

  // when a movie selected from the movie list, request this movie's details by id
  const getSelectedMovieID = (movieID: string) =>
  {
    setSelectedMovieID(movieID);
  };

  useEffect(() =>
  {
    if (selectedMovieID)
    {
      setIsMovieDetailsLoading(true);
      requestMovieDetails(selectedMovieID);
    }
  }, [selectedMovieID]);

  const requestMovieDetails = (movieID: string) =>
  {
    axios.get(`${BASE_URL}?i=${movieID}&apikey=${API_KEY}`)
      .then((response) =>
      {
        setSelectedMovieDetails(response.data);
      })
      .catch((error) =>
      {
        console.log(error);
      })
      .then(() =>
      {
        setIsMovieDetailsLoading(false);
      })
  };

  return (
    <>
      <header>
        <SearchBar getSearchParamsChange={getSearchParamsChange} />
      </header>
      <div className="main-content">
        <div className="grid-x grid-margin-x">
          <div className="cell small-12 medium-5">
            <MoviesList
              isMovieListLoading={isMovieListLoading}
              searchedResultsQuantity={searchedResultsQuantity}
              moviesList={moviesList}
              selectedMovieID={selectedMovieID}
              getSelectedMovieID={getSelectedMovieID}
              requestMoreMovieListItems={requestMoreMovieListItems}
            />
          </div>
          <div className="cell small-12 medium-7">
            <MovieDetails
              selectedMovieDetails={selectedMovieDetails}
              isMovieDetailsLoading={isMovieDetailsLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieSearchMain;