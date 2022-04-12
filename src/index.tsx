import React from "react";
import ReactDOM from "react-dom";

import { WatchListProvider } from "./_context/watchListContext";
import App from './App/app';

ReactDOM.render(
  <WatchListProvider>
    <App />
  </WatchListProvider>,
  document.getElementById('root')
);