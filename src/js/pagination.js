import { state } from '../index';
import { renderMoviesList } from './movies-list';

const renderMoviesPage = () => {
  const start = (state.page - 1) * state.perPage;
  const end = start + state.perPage;
  const moviesToRender = state.movies.slice(start, end);
  renderMoviesList(moviesToRender);
};

export const changePage = (page) => {
  state.page = page;
  renderMoviesPage();
  renderPaginationButtons();
};

export const renderPaginationButtons = () => {
  const totalPages = Math.ceil(state.movies.length / state.perPage);
  let buttonsHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    buttonsHTML += `<button onclick="changePage(${i})">${i}</button>`;
  }

  paginationContainer.innerHTML = buttonsHTML;
};
