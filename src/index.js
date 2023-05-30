import './sass/main.scss';
import { renderPaginationButtons } from './js/pagination';
import { handleGenreClick } from './js/getMoviesByGenre';
import './js/team-list';
import { getMovies, renderMoviesList } from './js/movies-list';
import { searchMovie } from './js/searchMovie';
import { renderLoadingSpinner } from './js/loadingSpinner';
import { popup, acceptCookies } from './js/cookies';
import { openModal, closeModal } from './js/details';
import './js/trailer';

// VARIABLES
const searchForm = document.getElementById('search-form');

export const moviesContainer = document.querySelector('.covers-container');
const closeBtn = document.getElementById('close-modal');
const genresContainer = document.querySelector('.container-genres');
const genreLinks = genresContainer.querySelectorAll('.genres');

// STATE
export const state = {
  movies: [],
  page: 1,
  perPage: 20,
  totalPages: 0,
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
    state.totalPages = Math.min(total_pages, 10);
    // 4. Render movies from state
    renderMoviesList(state.movies);
    // 5. Render pagination buttons
    renderPaginationButtons(state.totalPages);
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
    state.totalPages = Math.min(total_pages, 10);
    state.query = formInput.value.trim();
    // 5. Render movies from state
    renderMoviesList(state.movies);
    // 6. Render pagination buttons
    renderPaginationButtons(state.totalPages);
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

// Listeners

// Open modal
moviesContainer.addEventListener('click', openModal);

// Close modal
closeBtn.addEventListener('click', closeModal);

// Filter movies by genre
genreLinks.forEach((link) => {
  link.addEventListener('click', handleGenreClick);
});
