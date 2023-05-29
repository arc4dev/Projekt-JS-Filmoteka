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

  for (let i = 1; i <= state.totalPages; i++) {
    buttonsHTML += `<button class="pagination-button" data-page="${i}">${i}</button>`;
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
