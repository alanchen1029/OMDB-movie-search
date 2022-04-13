import React, { useState, useEffect, useContext } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import { useDebounce } from 'use-debounce';
import { BiCameraMovie } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { WatchListContext } from '../../_context/watchListContext';

interface ISearchBar
{
  isMovieListLoading: boolean;
  getSearchParamsChange: (params: string) => void;
  getSearchYearRangeChange: (range: number[]) => void;
}

export const SearchBar = ({ isMovieListLoading, getSearchParamsChange, getSearchYearRangeChange }: ISearchBar): JSX.Element =>
{
  const searchCategories = ["any", "movie", "series", "episode"];
  const [searchedTitle, setSearchedTitle] = useState("");
  // the first movie made in 1878 'The Horse in Motion'
  const [searchedYearRange, setSearchedYearRange] = useState<number[]>([1878, new Date().getFullYear()]);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState("");
  const [debouncedSearchedTitle] = useDebounce(searchedTitle, 500);
  const { watchlist } = useContext(WatchListContext);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
  {
    setSearchedTitle(event.target.value);
  };

  const handleYearRangeChange = (event: Event, newValue: number[] | number) =>
  {
    if (newValue instanceof Array)
    {
      setSearchedYearRange(newValue);
    }
  };

  const handleRadioInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setSelectedSearchCategory(event.target.value);
  };

  useEffect(() =>
  {
    if (debouncedSearchedTitle.length > 0)
    {
      let searchParam = `?s=${debouncedSearchedTitle}`;
      // type param excludes if category is any
      let categoryParam = `${selectedSearchCategory !== searchCategories[0] ? `&type=${selectedSearchCategory}` : ""}`;
      getSearchParamsChange(searchParam + categoryParam);
    } else
    {
      getSearchParamsChange("");
    }
  }, [debouncedSearchedTitle, selectedSearchCategory])

  return (
    <header>
      <div className="header-wrapper">
        <div className="left-container">
          <label htmlFor="search">
            <MdOutlineSearch color='white' className="search-icon" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search movies here"
              onChange={handleSearchInputChange}
            />
          </label>
        </div>
        <div className="right-container">
          <div className="year-filter">
            <div className="filter-name">
              YEAR
            </div>
            <div className="range-slider-container">
              <span>{searchedYearRange[0]}</span>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={searchedYearRange}
                onChange={handleYearRangeChange}
                onChangeCommitted={() =>
                {
                  getSearchYearRangeChange(searchedYearRange);
                }}
                valueLabelDisplay="auto"
                min={1878}
                max={new Date().getFullYear()}
                disabled={isMovieListLoading}
              />
              <span>{searchedYearRange[1]}</span>
            </div>
          </div>
          <div className="category-filter">
            <span className="filter-name">TYPE</span>
            <div className="radios-list">
              {searchCategories.map((category, index) => (
                <div className="radio-item" key={index}>
                  <Radio
                    checked={selectedSearchCategory === category}
                    onChange={handleRadioInputChange}
                    value={category}
                    name={category}
                    id={category}
                    disabled={isMovieListLoading}
                    sx={{
                      color: "#ffffff",
                      '&.Mui-checked': {
                        color: "#ffffff",
                      },
                    }}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="watchlist-counter">
            <Link to="/watchlist">
              <BiCameraMovie color='black' /> {watchlist.length}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}