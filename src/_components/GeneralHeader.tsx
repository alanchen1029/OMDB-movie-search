import React, { useContext } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { BiCameraMovie } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { WatchListContext } from '../_context/watchListContext';

const Header = (): JSX.Element =>
{
  const { watchlist } = useContext(WatchListContext);

  return (
    <header>
      <div className="header-wrapper">
        <div className="left-container">
          <Link to="/">
            <MdOutlineSearch color='white' className="search-icon" />
            Watchlist
          </Link>
        </div>
        <div className="right-container">
          <div className="watchlist-counter">
            <Link to="/watchlist">
              <BiCameraMovie color='black' /> {watchlist.length}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
};

export default Header;