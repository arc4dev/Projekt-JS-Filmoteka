import './sass/main.scss';
import { renderMoviesPage, renderPaginationButtons } from './js/pagination';
import './js/team-list';
import { getMovies, renderMoviesList } from './js/movies-list';
import { searchMovie } from './js/searchMovie';
import { renderLoadingSpinner } from './js/loadingSpinner';
import { addToList } from './js/addToList';
import { openModal, closeModal } from './js/details';


// VARIABLES
const searchForm = document.getElementById('search-form');
const moviesContainer = document.querySelector('.covers-container');

const closeBtn = document.getElementById('close-modal');

// STATE
export const state = {
  movies: [],
  page: 1,
  perPage: 10,
};

// FUNCTIONS
const renderTrendingMovies = async () => {
  try {
    // 1. Render loading spinner
    renderLoadingSpinner(moviesContainer);
    // 2. Get trending movies
    const movies = await getMovies();
    addToList(movies);
    // 3. Set movies in state
    state.movies = movies;
    // 4. Render movies from state
    renderMoviesPage();
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
    const movies = await searchMovie(formInput);
    addToList(movies);
    // 4. Set movies in state
    state.movies = movies;
    // 5. Render movies from state
    renderMoviesPage();
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

// Listeners

// Open modal
moviesContainer.addEventListener('click', openModal);

// Close modal
closeBtn.addEventListener('click', closeModal);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
