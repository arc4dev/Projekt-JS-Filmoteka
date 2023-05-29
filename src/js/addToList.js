const dataBaseOfWatchedFilms = [];
const dataBaseOfQueueFilms = [];

export function addToList(movieData, evCurrentTarget) {
  console.log(evCurrentTarget);
  // console.log(movieData);

  const save = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };

  if (
    evCurrentTarget === 'btn-addToWatch' &&
    !dataBaseOfWatchedFilms.includes(movieData)
  ) {
    dataBaseOfWatchedFilms.push(movieData);
    save('WatchedFilms', dataBaseOfWatchedFilms);
  }
  if (
    evCurrentTarget === 'btn-addToQueue' &&
    !dataBaseOfQueueFilms.includes(movieData)
  ) {
    dataBaseOfQueueFilms.push(movieData);
    save('Queue', dataBaseOfQueueFilms);
  }
  console.log(dataBaseOfWatchedFilms);
  console.log(dataBaseOfQueueFilms);
}
