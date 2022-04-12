# OMDB-movie-search
By using the OMDB API to build a movie/series search 

# Prerequisite
node version : 12.0.0

# Getting Started
Install dependencies
```
npm install
```
Run the project
```
npm start
```
If the code fails to open your browser automatically, please hit the url below in your browser
```
https://localhost:8080
```
# Libraries Used 
| Name        | Description        |
| ------------- |:-------------:|
| [axios](https://github.com/axios/axios)     | Performed all api request | 
| [MUI](https://mui.com/)     | Range slider and radio inputs group were used in search header | 
| [Foundation 6](https://get.foundation/sites/docs/)     | Grid system was used in building page layout  |
| [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton#readme) | Loading views for movies list section and movie details section  |
| [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component#readme) | Enabled movies list to be able to scroll down and request more result from OMDB API, and interacted with loading skeleton at the same time  |
| [React Icons](https://react-icons.github.io/react-icons/)     | Icons Library | 
| [useDebounce](https://github.com/xnimorz/use-debounce)     | Call api request every time the user enter a character in search input is too expansive, this hook compare prev and next value and trigger debounce timer. In this case, search input text state change triggers until user stops typing for 500ms  | 
# Idea
Based on description and design, this task should mainly include:
- Header: accept user text input, range input & radio input
- Search input change trigger api call
- Left-hand column: render data fetched from OMDB api, each item can be selected and to trigger another api call to fetch a more detailed movie
- Main section: render detailed movie data
- Watchlist: State management library should be involved
# Directory Structure
Intruction to my prefered directory structure
- src: root directory 
   - _components: global components
   - _constants: globally used constants like route constants, action constants. Main purpose for this is trying to avoid write plain strings in component, especially for globally used constants. For example, if one page's route change from "/page1" to "/page-1", the only thing I need to do is to change it at routes.constants.ts file.
   - _context: context related for global state management
   - assets: assets inlcuding images and stylesheets
      - stylesheets/style.sass: style entrypoint 
   - types: declaration, defining types and interface here
   - App: app's entrypoint, and routes were set up here
   - MovieSearchPage: directory of a page
      - components: components only used for this page
   
  
