import React, { useContext } from 'react';
import Skeleton from "react-loading-skeleton";
import Button from '@mui/material/Button';

import { CtaMessagesEnum, IMovieDetails } from '../../types/movies.model';
import PosterNotAvailable from "../../assets/images/no-image-available.jpeg";
import CtaPanel from '../../_components/CtaPanel';
import { WatchListContext } from '../../_context/watchListContext';

interface IMovieDetailsProps
{
  selectedMovieDetails: IMovieDetails | null;
  isMovieDetailsLoading: boolean;
}

export const MovieDetails = ({ selectedMovieDetails, isMovieDetailsLoading }: IMovieDetailsProps): JSX.Element =>
{
  const { watchlist, addMovieToWatchlist, removeMovieFromWatchlist } = useContext(WatchListContext);

  const handleClick = () =>
  {
    if (selectedMovieDetails)
    {
      watchlist.find((movie) => movie.imdbID === selectedMovieDetails.imdbID) ? removeMovieFromWatchlist(selectedMovieDetails.imdbID) : addMovieToWatchlist({
        Poster: selectedMovieDetails.Poster,
        Title: selectedMovieDetails.Title,
        Type: selectedMovieDetails.Type,
        Year: selectedMovieDetails.Year,
        imdbID: selectedMovieDetails.imdbID
      });
    }
  };

  const movieDetailsLoadingView = () =>
  {
    return (
      <section className="movie-details-wrapper">
        <div className="movie-details-top">
          <div className="grid-x grid-margin-x">
            <div className="cell small-12 medium-5 left">
              <Skeleton count={1} height={375} />
            </div>
            <div className="cell small-12 medium-7 right">
              <div className="action-container">
                <Skeleton count={1} height={40} />
              </div>
              <div className="info-container">
                <Skeleton count={3} height={60} />
              </div>
            </div>
          </div>
        </div>
        <div className="movie-details-middle">
          <article className="plot">
            <Skeleton count={1} height={140} />
          </article>
        </div>
        <div className="movie-details-bottom">
          <Skeleton count={1} height={100} />
        </div>
      </section>
    )
  };

  if (isMovieDetailsLoading)
  {
    return movieDetailsLoadingView();
  };

  return (
    <section className="movie-details-wrapper">
      {selectedMovieDetails ?
        <>
          <div className="movie-details-top">
            <div className="grid-x grid-margin-x">
              <div className="cell small-12 medium-5 left">
                <img src={selectedMovieDetails.Poster !== "N/A" ? selectedMovieDetails.Poster : PosterNotAvailable} alt="" />
              </div>
              <div className="cell small-12 medium-7 right">
                <div className="action-container">
                  <Button
                    variant="outlined"
                    color={`${watchlist.find((movie) => movie.imdbID === selectedMovieDetails.imdbID) ? "error" : "inherit"}`}
                    onClick={handleClick}
                  >
                    {watchlist.find((movie) => movie.imdbID === selectedMovieDetails.imdbID) ? "Remove From Watchlist" : "Watchlist"}
                  </Button>
                </div>
                <div className="info-container">
                  <span className="title">{selectedMovieDetails.Title}</span>
                  <div className="others">
                    <span className="rated">{selectedMovieDetails.Rated}</span>
                    <span className="year">{selectedMovieDetails.Year}</span>
                    <span className="genre">{selectedMovieDetails.Genre}</span>
                    <span className="runtime">{selectedMovieDetails.Runtime}</span>
                  </div>
                  <span className="actors">{selectedMovieDetails.Actors}</span>
                </div>
              </div>
            </div>

          </div>
          <div className="movie-details-middle">
            <article className="plot">
              {selectedMovieDetails.Plot}
            </article>
          </div>
          <div className="movie-details-bottom">
            <div className="ratings-list">
              {selectedMovieDetails.Ratings.map((rating, index) => (
                <div className="rating-item" key={index}>
                  <span>{rating.Value}</span>
                  <span>{rating.Source}</span>
                </div>
              ))}
            </div>
          </div>
        </>
        :
        <CtaPanel ctaMessage={CtaMessagesEnum.ViewFullDetails} />
      }
    </section>
  );
}