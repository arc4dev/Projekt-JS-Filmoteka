import { getMovies, renderMoviesList } from './movies-list';
import { renderPaginationButtons } from './pagination';
import { searchMovie } from './searchMovie';
import { renderLoadingSpinner } from './loadingSpinner';
import { moviesContainer } from '..';
import { state } from '..';

export const renderTrendingMovies = async () => {
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

export const renderSearchedMovies = async (e) => {
  try {
    // 1. Get input value
    const formInput = e.target.elements.searchInput;
    if (!formInput) return;
    // 2. Render loading spinner
    renderLoadingSpinner(moviesContainer);
    // 3. Get movies query
    const { results: movies, total_pages } = await searchMovie(
      (state.page = 1),
      formInput.value,
      state.genreId
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
