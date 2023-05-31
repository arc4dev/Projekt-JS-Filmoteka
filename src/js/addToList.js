import { state } from '..';

export function addToList(movieData, evCurrentTarget) {
  // save to JSON
  const save = (key, stateMovies) => {
    try {
      const storageState = JSON.parse(localStorage.getItem(key)) || [];

      // Check if there is any duplicated movie
      const updatedState = storageState
        .concat(stateMovies)
        .reduce((acc, movie) => {
          // Check if the movie ID is already present in the accumulator array
          if (!acc.some((storedMovie) => storedMovie.id === movie.id)) {
            acc.push(movie);
          }
          return acc;
        }, []);

      const serializedState = JSON.stringify(updatedState);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };

  // If watch
  if (
    evCurrentTarget === 'btn-addToWatch' &&
    !state.watchedFilms.includes(movieData)
  ) {
    state.watchedFilms.push(movieData);
    save('Watched', state.watchedFilms);
  }

  // If queue
  if (
    evCurrentTarget === 'btn-addToQueue' &&
    !state.queueFilms.includes(movieData)
  ) {
    state.queueFilms.push(movieData);
    save('Queue', state.queueFilms);
  }
}
