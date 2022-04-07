import React from 'react';

import "../assets/stylesheets/style.sass";
import MovieSearchMain from '../MovieSearchPage/MovieSearchMain';

const App = (): JSX.Element =>
{
  return (
    <div className="main-content">
      <MovieSearchMain />
    </div>
  );
};

export default App;