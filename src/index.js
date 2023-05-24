import './sass/main.scss';
import { renderMoviesList } from './js/movies-list';
import { searchMovie } from './js/searchMovie';
// Search movie by name
export const searchInput = document.getElementById('search-input');
export const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  searchMovie();
});
searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchMovie();
  }
});
// Render trending movies on load
renderMoviesList();
