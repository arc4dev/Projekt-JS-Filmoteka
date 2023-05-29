import './sass/main.scss';
import { getMovies } from './js/movies-list';
import { renderMoviesList } from './js/movies-list';
import { renderPaginationButtons } from './js/pagination';
import { searchMovie } from './js/searchMovie';
import { renderLoadingSpinner } from './js/loadingSpinner';

// VARIABLES
const searchForm = document.getElementById('search-form');
export const moviesContainer = document.querySelector('.covers-container');

// STATE
export const state = {
  movies: [],
  page: 1,
  perPage: 20,
  totalResults: 0,
  query: '',
};

// FUNCTIONS
const renderTrendingMovies = async () => {
  try {
    // 1. Render loading spinner
    renderLoadingSpinner(moviesContainer);
    // 2. Get trending movies
    const { results: movies, total_pages } = await getMovies(state.page);
    // 3. Set movies in state
    state.movies = movies;
    state.totalPages = total_pages;
    // 4. Render movies from state
    renderMoviesList(state.movies);
    // 5. Render pagination buttons
    renderPaginationButtons();
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
    const { results: movies, total_pages } = await searchMovie(
      state.page,
      formInput.value
    );
    // 4. Set movies in state
    state.movies = movies;
    state.totalPages = total_pages;
    state.query = formInput.value.trim();
    // 5. Render movies from state
    renderMoviesList(state.movies);
    // 6. Render pagination buttons
    renderPaginationButtons();
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
