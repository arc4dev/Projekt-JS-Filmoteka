import { getMovies } from './movies-list';
import { API_KEY, URL_SEARCH, API_LANGUAGE, API_URL } from './config';
import { Notify } from 'notiflix';
const pagination = document.getElementById('pagination-container');
const genres = document.querySelector('.container-genres');

export async function searchMovie(page, searchValue, genreId) {
  try {
    console.log(page, searchValue, genreId);
    let searchUrl = undefined;
    if (searchValue !== '') {
      searchUrl = `${URL_SEARCH}api_key=${API_KEY}&language=${API_LANGUAGE}&query=${searchValue.trim()}&page=${page}`;
      pagination.classList.remove('is-hidden');
    }

    if (genreId !== undefined) {
      console.log('genre');
      searchUrl = `${API_URL}discover/movie?api_key=${API_KEY}&language=${API_LANGUAGE}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`;
    }

    console.log(searchUrl);

    let data = await getMovies(page, searchUrl);

    if (data.results.length === 0) {
      Notify.failure('Nie ma filmów o takiej nazwie! Spróbuj ponownie...');
      pagination.classList.add('is-hidden');
      genres.classList.add('is-hidden');
    } else {
      pagination.classList.remove('is-hidden');
      genres.classList.remove('is-hidden');
    }

    return data;
  } catch (err) {
    throw err;
  }
}
