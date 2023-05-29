import './sass/main.scss';
import { getMovies, renderMoviesList } from './js/movies-list';
import { searchMovie } from './js/searchMovie';
import { renderLoadingSpinner } from './js/loadingSpinner';
import { popup, acceptCookies } from './js/cookies';

// VARIABLES
const searchForm = document.getElementById('search-form');
const moviesContainer = document.querySelector('.covers-container');

// STATE
const state = {
  movies: [],
  page: 1,
};

// FUNCTIONS
const renderTrendingMovies = async () => {
  try {
    // 1. Render loading spinner
    renderLoadingSpinner(moviesContainer);
    // 2. Get trending movies
    const movies = await getMovies();
    // 3. Set movies in state
    state.movies = movies;
    // 4. Render movies from state
    renderMoviesList(state.movies);
  } catch (err) {
    console.error(err);
  }
};

const renderSearchedMovies = async (e) => {
  try {
    e.preventDefault();
    // 1. Get input value
    const formInput = e.target.elements.searchInput;
    if (!formInput) return;
    // 2. Render loading spinner
    renderLoadingSpinner(moviesContainer);
    // 3. Get movies query
    const movies = await searchMovie(formInput);
    // 4. Set movies in state
    state.movies = movies;
    // 5. Render movies from state
    renderMoviesList(state.movies);
  } catch (err) {
    console.error(err);
  }
};

////////////////
// START

// Render trending movies on load
if (searchForm) {
  renderTrendingMovies();
}

// Render movies on search
if (searchForm) {
  searchForm.addEventListener('submit', renderSearchedMovies);
}
