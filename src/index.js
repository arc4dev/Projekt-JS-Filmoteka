import './sass/main.scss';
import { renderMoviesList } from './js/movies-list';
import { searchMovie } from './js/searchMovie';

const searchForm = document.getElementById('search-form');

// Render trending movies on load
try {
  renderMoviesList();
} catch (err) {
  console.log(err);
}

// Render movies on search
if (searchForm) {
  try {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();

      const formInput = e.target.elements.searchInput;
      searchMovie(formInput);
    });
  } catch (err) {
    console.error(err);
  }
}
