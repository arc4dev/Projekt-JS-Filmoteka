import { state } from '../index';
import { renderMoviesList } from './movies-list';
import { searchMovie } from './searchMovie';
import { moviesContainer } from '../index';
import { renderLoadingSpinner } from './loadingSpinner';

const paginationContainer = document.querySelector('.pagination-container');

// export const renderMoviesPage = () => {
//   console.log('Movies:', state.movies); //
//   const start = (state.page - 1) * state.perPage;
//   const end = start + state.perPage;
//   const moviesToRender = state.movies.slice(start, end);
//   renderMoviesList(moviesToRender);
// };

export const changePage = async (page, query) => {
  try {
    renderLoadingSpinner(moviesContainer);

    const { results: movies, total_pages } = await searchMovie(page, query);

    state.page = page;
    state.movies = movies;
    state.totalPages = total_pages;

    renderMoviesList(movies);
    renderPaginationButtons();
  } catch (err) {
    throw err;
  }
};

export const renderPaginationButtons = () => {
  paginationContainer.innerHTML = '';

  let buttonsHTML = '';
  const maxButtonsToShow = 3;
  const totalPages = state.totalPages;
  let startPage = state.page - Math.floor(maxButtonsToShow / 2);
  let endPage = state.page + Math.floor(maxButtonsToShow / 2);
  if (totalPages <= maxButtonsToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (state.page <= Math.floor(maxButtonsToShow / 2)) {
      startPage = 1;
      endPage = maxButtonsToShow;
    } else if (state.page >= totalPages - Math.floor(maxButtonsToShow / 2)) {
      startPage = totalPages - maxButtonsToShow + 1;
      endPage = totalPages;
    }
  }
  if (startPage > 1) {
    buttonsHTML += `<button class="pagination-button" data-page="1">1</button>`;
    if (startPage > 2) {
      buttonsHTML += `<span class="pagination-ellipsis">...</span>`;
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    buttonsHTML += `<button class="pagination-button" data-page="${i}">${i}</button>`;
  }
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      buttonsHTML += `<span class="pagination-ellipsis">...</span>`;
    }
    buttonsHTML += `<button class="pagination-button" data-page="${totalPages}">${totalPages}</button>`;
  }

  paginationContainer.innerHTML = buttonsHTML;

  const paginationButtons = document.querySelectorAll('.pagination-button');
  paginationButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const page = parseInt(button.dataset.page);
      changePage(page, state.query);
    });
  });
};
