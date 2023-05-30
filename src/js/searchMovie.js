import { getMovies } from './movies-list';
import { API_KEY, URL_SEARCH, API_LANGUAGE } from './config';
import { Notify } from 'notiflix';
const pagination = document.getElementById('pagination-container');

export async function searchMovie(page, searchValue) {
  try {
    let searchUrl = undefined;

    if (searchValue !== '') {
      searchUrl = `${URL_SEARCH}api_key=${API_KEY}&language=${API_LANGUAGE}&query=${searchValue.trim()}&page=${page}`;
      pagination.classList.remove('is-hidden');
    }

    let data = await getMovies(page, searchUrl);

    if (data.results.length === 0) {
      Notify.failure('Nie ma filmów o takiej nazwie! Spróbuj ponownie...');
      pagination.classList.add('is-hidden');
    }

    return data;
  } catch (err) {
    throw err;
  }
}
