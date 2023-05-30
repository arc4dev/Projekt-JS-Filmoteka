import { state } from '../index';
import { renderMoviesList } from './movies-list';
import { searchMovie } from './searchMovie';
import { moviesContainer } from '../index';
import { renderLoadingSpinner } from './loadingSpinner';

const paginationContainer = document.querySelector('.pagination-container');
const maxButtonsToShow = 5;

export const changePage = async (page, query) => {
  try {
    renderLoadingSpinner(moviesContainer);
    const { results: movies, total_pages } = await searchMovie(page, query);
    state.page = page;
    state.movies = movies;
    state.totalPages = Math.min(total_pages, 10);

    renderMoviesList(movies);
    renderPaginationButtons(state.totalPages);
  } catch (err) {
    throw err;
  }
};

export const renderPaginationButtons = (maxTotalPages) => {
  paginationContainer.innerHTML = '';
  const startPage = calculateStartPage();
  const endPage = calculateEndPage();
  const buttonsHTML = generatePaginationButtonsHTML(
    startPage,
    endPage,
    maxTotalPages
  );
  paginationContainer.innerHTML = buttonsHTML;
  addClickEventListeners();
};

const calculateStartPage = () => {
  let startPage = state.page - Math.floor(maxButtonsToShow / 2);
  if (state.totalPages <= maxButtonsToShow) {
    startPage = 1;
  } else if (
    state.page >=
    state.totalPages - Math.floor(maxButtonsToShow / 2)
  ) {
    startPage = Math.max(1, state.page - Math.floor(maxButtonsToShow / 2));
  }
  return Math.max(1, startPage);
};

const calculateEndPage = () => {
  let endPage = state.page + Math.floor(maxButtonsToShow / 2) - 1;
  if (state.totalPages <= maxButtonsToShow) {
    endPage = state.totalPages;
  } else if (state.page <= Math.floor(maxButtonsToShow / 2)) {
    endPage = maxButtonsToShow;
  }
  return Math.min(state.totalPages, endPage);
};

const generatePaginationButtonsHTML = (startPage, endPage, totalPages) => {
  let buttonsHTML = '';
  if (startPage > 1) {
    buttonsHTML += generatePaginationButtonHTML(1);
    if (startPage > 2) {
      buttonsHTML += `<span class="pagination-ellipsis">...</span>`;
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    buttonsHTML += generatePaginationButtonHTML(i);
  }
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      buttonsHTML += `<span class="pagination-ellipsis">...</span>`;
    }
    buttonsHTML += generatePaginationButtonHTML(totalPages);
  }
  return buttonsHTML;
};

const generatePaginationButtonHTML = (pageNumber) => {
  return `<button class="pagination-button" data-page="${pageNumber}">${pageNumber}</button>`;
};

const addClickEventListeners = () => {
  const paginationButtons = document.querySelectorAll('.pagination-button');

  paginationButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const page = parseInt(button.dataset.page);
      changePage(page, state.query);
    });
  });
};
