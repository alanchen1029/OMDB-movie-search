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