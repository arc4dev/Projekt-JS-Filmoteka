import { state } from '../index';
import { renderMoviesList } from './movies-list';

const paginationContainer = document.querySelector('.pagination-container');

export const renderMoviesPage = () => {
  console.log('Movies:', state.movies); //
  const start = (state.page - 1) * state.perPage;
  const end = start + state.perPage;
  const moviesToRender = state.movies.slice(start, end);
  renderMoviesList(moviesToRender);
};

export const changePage = (page) => {
  state.page = page;
  const totalPages = Math.ceil(state.movies.length / state.perPage); // Aktualizacja liczby stron
  state.totalPages = totalPages; // Zapisanie liczby stron w stanie
  renderMoviesPage();
  renderPaginationButtons();
};

export const renderPaginationButtons = () => {
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(state.movies.length / state.perPage);
  let buttonsHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    buttonsHTML += `<button class="pagination-button" data-page="${i}">${i}</button>`;
  }

  paginationContainer.innerHTML = buttonsHTML;

  const paginationButtons = document.querySelectorAll('.pagination-button');
  paginationButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const page = parseInt(button.dataset.page);
      changePage(page);
    });
  });
};
