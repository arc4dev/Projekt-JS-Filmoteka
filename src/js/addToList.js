import { state } from '..';

import { ref } from 'firebase/database';

export function addToList(auth, database, movieData, evCurrentTarget) {
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
  console.log(auth, database);

  const userId = auth.currentUser.uid;
  if (!userId) return alert('You are not logged in!');

  const userRef = database.ref('users/' + userId);

  // Retrieve the user's data from the database
  userRef.once('value', (snapshot) => {
    const userData = snapshot.val();

    // If watch
    if (evCurrentTarget === 'btn-addToWatch') {
      userData.watchedFilms.push(movieData);
      // state.watchedFilms.push(movieData);
      // save('Watched', state.watchedFilms);
    }

    // If queue
    if (evCurrentTarget === 'btn-addToQueue') {
      userData.queuedFilms.push(movieData);
      // state.queueFilms.push(movieData);
      // save('Queue', state.queueFilms);
    }

    // Save the modified user data back to the database
    userRef
      .set(userData)
      .then(() => {
        console.log('Movies added to the user successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
