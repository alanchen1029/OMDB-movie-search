import React, { useState, useEffect } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import Radio from "@mui/material/Radio";
import Slider from '@mui/material/Slider';

interface ISearchBar
{
  getSearchParamsChange: (params: string) => void;
}

export const SearchBar = ({ getSearchParamsChange }: ISearchBar): JSX.Element =>
{
  const searchCategories = ["any", "movie", "series", "episode"];
  const [searchedTitle, setSearchedTitle] = useState("");
  // the first movie made in 1878 'The Horse in Motion'
  const [searchedYearRange, setSearchedYearRange] = useState([1878, new Date().getFullYear()]);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState("");
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
  {
    setSearchedTitle(event.target.value);
  }

  const handleYearRangeChange = (event: Event, newValue: any) =>
  {
    setSearchedYearRange(newValue);
  };

  const handleRadioInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setSelectedSearchCategory(event.target.value);
  };

  useEffect(() =>
  {
    if (searchedTitle.length > 0)
    {
      let searchParam = `?s=${searchedTitle}`;
      // type param excludes if category is any
      let categoryParam = `${selectedSearchCategory !== searchCategories[0] ? `&type=${selectedSearchCategory}` : ""}`;
      let yearParam = `&y=${searchedYearRange[1]}`
      getSearchParamsChange(searchParam + categoryParam);
    } else
    {
      getSearchParamsChange("");
    }
  }, [searchedTitle, selectedSearchCategory, searchedYearRange])

  return (
    <div className="search-bar-wrapper">
      <div className="search-container">
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
      <div className="filter-container">
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
              valueLabelDisplay="auto"
              min={1878}
              max={new Date().getFullYear()}
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
      </div>

    </div>
  );
}