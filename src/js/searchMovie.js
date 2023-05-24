import { renderMoviesList } from './movies-list';
import { API_KEY } from './config';
import { API_LANGUAGE } from './config';
import { URL_SEARCH } from './config';
import { searchInput } from '../index';

export function searchMovie() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    const searchURL = `${URL_SEARCH}api_key=${API_KEY}&language=${API_LANGUAGE}&query=${searchTerm}`;
    searchInput.value = '';
    renderMoviesList(searchURL);
  }
}
