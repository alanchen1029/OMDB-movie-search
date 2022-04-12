import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../assets/stylesheets/style.sass";
import MovieSearchMain from '../MovieSearchPage/MovieSearchMain';
import { WatchlistPage } from '../WatchListPage/WatchList';
import { ROOT_ROUTE, WATCHLIST_ROUTE } from '../_constants/routes.constants';

const App = (): JSX.Element =>
{
  return (
    <main className="app-main">
      <BrowserRouter >
        <Routes>
          <Route
            path={ROOT_ROUTE}
            element={<MovieSearchMain />}
          />
          <Route
            path={WATCHLIST_ROUTE}
            element={<WatchlistPage />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;