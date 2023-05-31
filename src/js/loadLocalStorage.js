import { Notify } from 'notiflix';
import { renderMoviesList } from './movies-list';
import { state } from '..';

export const loadLocalStorage = () => {
  try {
    let watchState = localStorage.getItem('Watched');
    let queueState = localStorage.getItem('Queue');

    if (!watchState || watchState.length === 0) watchState = [];
    if (!queueState || queueState.length === 0) queueState = [];

    state.watchedFilms = JSON.parse(watchState);
    state.queueFilms = JSON.parse(queueState);

    console.log(state);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

// function removeDuplicates(array) {
//   if (array) {
//     return array.filter((value, index, self) => {
//       return self.indexOf(value) === index;
//     });
//   }
// }

export const renderLocalStorage = (typeOfList) => {
  const filmList =
    typeOfList === 'btn-watched' ? state.watchedFilms : state.queueFilms;

  if (filmList.length === 0) {
    return Notify.failure(
      `Nie masz ${
        typeOfList === 'btn-watched' ? 'obejrzanych' : 'zakolejkowanych'
      } filmów!`
    );
  }

  renderMoviesList(filmList);
};
