import axios from 'axios';
import { API_URL } from './config';
import { API_KEY } from './config';
import { API_LANGUAGE } from './config';
import { genresList } from './movies-list';
import { renderMoviesList } from './movies-list';
import { renderPaginationButtons } from './pagination';
import { state } from '..';

export const handleGenreClick = async (event) => {
  const selectedGenre = event.target.textContent;
  try {
    const genresID = getGenreID(selectedGenre);
    const movies = await getMoviesByGenre(genresID);
    state.movies = movies;
    renderMoviesList(state.movies);
    renderPaginationButtons();
  } catch (err) {
    console.error(err);
  }
};
const getGenreID = (genreName) => {
  for (const genreID in genresList) {
    if (genresList[genreID] === genreName) {
      return genreID;
    }
  }
};
const getMoviesByGenre = async (genresID) => {
  try {
    const response = await axios.get(
      `${API_URL}discover/movie?api_key=${API_KEY}&language=${API_LANGUAGE}&with_genres=${genresID}&sort_by=popularity.desc`
    );
    return response.data.results;
  } catch (err) {
    throw err;
  }
};
