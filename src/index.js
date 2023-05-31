import './sass/main.scss';
import { handleGenreClick } from './js/getMoviesByGenre';
import './js/team-list';
import { popup, acceptCookies } from './js/cookies';
import { openModal, closeModal } from './js/details';
import './js/trailer';
import { loadLocalStorage, renderLocalStorage } from './js/loadLocalStorage';
import { renderSearchedMovies, renderTrendingMovies } from './js/renderMovies';

// VARIABLES
const searchForm = document.getElementById('search-form');

export const moviesContainer = document.querySelector('.covers-container');
const closeBtn = document.getElementById('close-modal');
const genresContainer = document.querySelector('.container-genres');

const btnWatch = document.getElementById('btn-watched');
const btnQueue = document.getElementById('btn-queue');

// STATE
export const state = {
  movies: [],
  page: 1,
  perPage: 20,
  totalPages: 0,
  query: '',
  genreId: undefined,
  watchedFilms: [],
  queueFilms: [],
};

////////////////
// START

// Load localstorage
loadLocalStorage();

// Render trending movies on load
if (searchForm) {
  renderTrendingMovies();
}

// Render movies on search
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    state.page = 1;
    state.genreId = undefined;

    renderSearchedMovies(e);
  });
}

// Listeners

// Open modal
moviesContainer.addEventListener('click', openModal);

// Close modal
closeBtn.addEventListener('click', closeModal);

// Filter movies by genre
if (genresContainer) {
  genresContainer.querySelectorAll('.genres').forEach((link) => {
    link.addEventListener('click', handleGenreClick);
  });
}

// Library sub-page
if (btnWatch && btnQueue) {
  let typeOfList = 'btn-watched'; // btn-watched or btn-queue
  renderLocalStorage(typeOfList);

  btnWatch.addEventListener('click', (ev) => {
    typeOfList = ev.currentTarget.id;
    renderLocalStorage(typeOfList);
  });

  btnQueue.addEventListener('click', (ev) => {
    typeOfList = ev.currentTarget.id;
    renderLocalStorage(typeOfList);
  });
}
