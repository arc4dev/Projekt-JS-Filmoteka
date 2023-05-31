import axios from 'axios';
import { API_URL, API_KEY, API_LANGUAGE } from './config';
import { renderPaginationButtons } from './pagination';
import { renderMoviesList, genresList } from './movies-list';
import { state } from '..';

export const handleGenreClick = async (event) => {
  const selectedGenre = event.target.textContent;
  try {
    const genresID = getGenreID(selectedGenre);
    const data = await getMoviesByGenre(genresID);

    state.query = '';
    state.genreId = genresID;
    state.movies = data.results;
    state.totalPages = Math.min(data.total_pages, 10);

    console.log(state);

    renderMoviesList(state.movies);
    renderPaginationButtons(state.totalPages);
  } catch (err) {
    console.error(err);
  }
};

const getGenreID = (genreName) => {
  for (const genreID in genresList) {
    if (genresList[genreID] === genreName) {
      return +genreID;
    }
  }
};

export const getMoviesByGenre = async (genresID) => {
  try {
    const response = await axios.get(
      `${API_URL}discover/movie?api_key=${API_KEY}&language=${API_LANGUAGE}&with_genres=${genresID}&sort_by=popularity.desc`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
