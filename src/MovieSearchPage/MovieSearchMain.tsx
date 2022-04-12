import React, { useState, useEffect } from 'react';
import axios from "axios";

import { SearchBar, MoviesList, MovieDetails } from './components';
import { CtaMessagesEnum, IMovieDetails, IMoviesListItem, OMDBAPIErrorMessagesEnum } from '../types/movies.model';
import CtaPanel from '../_components/CtaPanel';

// const anotherKEY = "26198c82";

const MovieSearchMain = (): JSX.Element =>
{
  const [searchParams, setSearchParams] = useState("");
  const [isMovieListLoading, setIsMovieListLoading] = useState(false);
  const [searchedResultsQuantity, setSearchedResultsQuantity] = useState(0);
  const [moviesListOriginal, setMoviesListOriginal] = useState<IMoviesListItem[] | []>([]);
  const [moviesList, setMoviesList] = useState<IMoviesListItem[] | []>([]);
  const [requestPageNum, setRequestPageNum] = useState(1);
  const [searchedYearRange, setSearchedYearRange] = useState([1878, new Date().getFullYear()]);
  const [selectedMovieID, setSelectedMovieID] = useState("");
  const [isMovieDetailsLoading, setIsMovieDetailsLoading] = useState(false);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState<IMovieDetails | null>(null);
  const [ctaMsg, setCtaMsg] = useState<CtaMessagesEnum | null>(CtaMessagesEnum.WelcomeMessage);
  const onRequest = axios.CancelToken.source()

  const resetSearch = () =>
  {
    setRequestPageNum(1);
    setSearchedResultsQuantity(0);
    setSelectedMovieID("");
    setSelectedMovieDetails(null);
    setMoviesListOriginal([]);
    setMoviesList([]);
    setCtaMsg(CtaMessagesEnum.WelcomeMessage);
  };

  // found data response may contains duplicated items, remove repeated ones
  const removeDuplication = (arr: IMoviesListItem[]): IMoviesListItem[] =>
  {
    const duplicationRemovedArr = arr.filter((itemOut, index) =>
    {
      const itemFirstListedIndex = arr.findIndex(itemIn =>
      {
        return itemIn.imdbID === itemOut.imdbID;
      });

      if (index === itemFirstListedIndex)
      {
        return itemOut;
      };
    });

    return duplicationRemovedArr;
  }

  const requestMoviesList = (params: string, pageNum: number) =>
  {
    setIsMovieListLoading(true);
    axios.get(`${BASE_URL}${params}&page=${pageNum}&apikey=${API_KEY}`, {
      cancelToken: onRequest.token
    })
      .then((response) =>
      {
        setSearchedResultsQuantity(parseInt(response.data.totalResults));
        if (response.data.Search)
        {
          setCtaMsg(null);
          if (pageNum === 1)
          {
            setMoviesListOriginal(response.data.Search);
          } else
          {
            // concat moviesListOriginal with next page's data
            setMoviesListOriginal([...moviesListOriginal, ...response.data.Search]);
          }
        };

        // errors, display cta message and reset movies list
        if (response.data.Error)
        {
          setMoviesList([]);
          switch (response.data.Error)
          {
            case OMDBAPIErrorMessagesEnum.TooManyResults:
              setCtaMsg(CtaMessagesEnum.BeMoreSpecific);
              break;
            case OMDBAPIErrorMessagesEnum.NotFound:
              setCtaMsg(CtaMessagesEnum.NoResultFound);
              break;
            default:
              setCtaMsg(CtaMessagesEnum.DefaultMessage);
          }
        }
      })
      .catch((error) =>
      {
        setCtaMsg(CtaMessagesEnum.DefaultMessage);
      })
      .then(() =>
      {
        setIsMovieListLoading(false);
      });
  };

  useEffect(() =>
  {
    if (moviesListOriginal.length > 0)
    {
      filterMoviesListWithYearRange();
    };
    // console.log(moviesListOriginal);
  }, [moviesListOriginal]);

  // when search params change, reset search and selected movie
  const getSearchParamsChange = (params: string) =>
  {
    setSearchParams(params);
  };

  useEffect(() =>
  {
    resetSearch();
    if (searchParams.length > 0)
    {
      requestMoviesList(searchParams, 1);
    };
  }, [searchParams]);

  // when scrolling down to the end of movie list, request another page of data
  const requestMoreMovieListItems = () =>
  {
    if (requestPageNum < Math.ceil(searchedResultsQuantity / 10))
    {
      setRequestPageNum(requestPageNum + 1);
    }
  };

  useEffect(() =>
  {
    if (searchParams.length > 0)
    {
      requestMoviesList(searchParams, requestPageNum);
    };
  }, [requestPageNum]);

  // when searched year range change or alright set, filter movies list
  const getSearchYearRangeChange = (range: number[]) =>
  {
    setSearchedYearRange(range);
  };

  useEffect(() =>
  {
    filterMoviesListWithYearRange();
  }, [searchedYearRange])

  const filterMoviesListWithYearRange = () =>
  {
    if (moviesListOriginal.length > 0)
    {
      const moviesListOriginalArrayCopy = moviesListOriginal;
      const newArr = moviesListOriginalArrayCopy.filter(movie =>
      {
        if (parseInt(movie.Year) >= searchedYearRange[0] && parseInt(movie.Year) <= searchedYearRange[1])
        {
          return movie;
        }
      });
      const removedDuplicationArr = removeDuplication(newArr);
      if (removedDuplicationArr.length === moviesList.length)
      {
        requestMoreMovieListItems();
      }
      setMoviesList(removedDuplicationArr);
      if (removedDuplicationArr.length < 10)
      {
        requestMoreMovieListItems();
      }
    }
  };
  console.log(moviesList, moviesListOriginal, searchedYearRange);

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
        setCtaMsg(CtaMessagesEnum.DefaultMessage);
      })
      .then(() =>
      {
        setIsMovieDetailsLoading(false);
      });
  };

  return (
    <>
      <SearchBar
        getSearchParamsChange={getSearchParamsChange}
        getSearchYearRangeChange={getSearchYearRangeChange}
      />
      <div className="main-content">
        {ctaMsg && moviesList.length < 1 ?
          <CtaPanel ctaMessage={ctaMsg} />
          :
          <div className="grid-x grid-margin-x">
            <div className="cell small-12 medium-5">
              <MoviesList
                isMovieListLoading={isMovieListLoading}
                hasLoadedAll={(moviesListOriginal.length >= searchedResultsQuantity)}
                searchedResultsQuantity={searchedResultsQuantity}
                moviesList={moviesList}
                selectedMovieID={selectedMovieID}
                getSelectedMovieID={getSelectedMovieID}
                requestMoreMovieListItems={requestMoreMovieListItems}
              />
            </div>
            <div className="cell small-12 medium-7">
              {moviesList.length > 0 &&
                <MovieDetails
                  selectedMovieDetails={selectedMovieDetails}
                  isMovieDetailsLoading={isMovieDetailsLoading}
                />
              }
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default MovieSearchMain;