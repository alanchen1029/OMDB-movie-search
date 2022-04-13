export interface IMoviesListItem
{
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

export type MovieRatings = {
  Source: string;
  Value: string;
};

export interface IMovieDetails extends IMoviesListItem
{
  Actors: string;
  Plot: string;
  Rated: string;
  Genre: string;
  Runtime: string;
  Ratings: MovieRatings[];
};

export enum CtaMessagesEnum
{
  WelcomeMessage = "Welcome to OMDB movie/series search playground, please enter a title.",
  BeMoreSpecific = "Too many results to be displayed, please be more specific.",
  NoResultFound = "No result found, please try another one or change filter options.",
  ViewFullDetails = "Please select one movie from list and view full details.",
  EmptyWatchlist = "No movie found in your watchlist, use movie search engine to search and add to your watchlist",
  DefaultMessage = "Unexpected error, please refresh the page and try again."
};

export enum OMDBAPIErrorMessagesEnum
{
  TooManyResults = "Too many results.",
  NotFound = "Movie not found!",
  NotFoundSeries = "Series not found!"
};