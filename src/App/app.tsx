import React from 'react';

import "../assets/stylesheets/style.sass";
import MovieSearchMain from '../MovieSearchPage/MovieSearchMain';

const App = (): JSX.Element =>
{
  return (
    <main className="app-main">
      <MovieSearchMain />
    </main>
  );
};

export default App;