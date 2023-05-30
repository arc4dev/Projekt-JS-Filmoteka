import { Notify } from 'notiflix';
import { renderMoviesList } from './movies-list';

const btnWatche = document.getElementById('btn-watched');
const btnQueue = document.getElementById('btn-queue');

//function load from localstorage
const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

function removeDuplicates(array) {
  if (array) {
    return array.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }
}

const renderLocaleStorage = (typeOfList) => {
  if (typeOfList === 'btn-watched') {
    const moviesFromLocalStorage = load('WatchedFilms');
    if (moviesFromLocalStorage === undefined) {
      Notify.failure('Nie ma obejrzanych filmów.');
    } else renderMoviesList(moviesFromLocalStorage);
  } else if (typeOfList === 'btn-queue') {
    const moviesFromLocalStorage = load('Queue');
    if (moviesFromLocalStorage === undefined) {
      Notify.failure('Nie ma filmów w kolejce.');
    } else renderMoviesList(moviesFromLocalStorage);
  }
};

let typeOfList = 'btn-watched';
renderLocaleStorage(typeOfList);

btnWatche.addEventListener('click', (ev) => {
  typeOfList = ev.currentTarget.id;
  renderLocaleStorage(typeOfList);
});

btnQueue.addEventListener('click', (ev) => {
  typeOfList = ev.currentTarget.id;
  renderLocaleStorage(typeOfList);
});
