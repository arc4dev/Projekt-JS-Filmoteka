import { getMovies } from './movies-list';
import { API_KEY, URL_SEARCH, API_LANGUAGE } from './config';
import { Notify } from 'notiflix';

export async function searchMovie(searchInput) {
  try {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
      const searchURL = `${URL_SEARCH}api_key=${API_KEY}&language=${API_LANGUAGE}&query=${searchTerm}`;
      searchInput.value = '';

      let movies = await getMovies(searchURL);

      if (movies.length === 0) {
        Notify.failure('Nie ma filmow o takiej nazwie! Spróbuj ponownie...');
        movies = await getMovies();
      }

      return movies;
      // await renderMoviesList(searchURL);
    }
  } catch (err) {
    throw err;
  }
}
