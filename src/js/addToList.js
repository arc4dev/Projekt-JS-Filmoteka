const IDFILMWATCHED = 502356; //data from modal window
const IDFILMQUEUE = 603692; //data from modal window
const dataBaseOfWatchedFilms = [];
const dataBaseOfQueueFilms = [];

export function addToList(moviesArray) {
  const btnAddToWatch = document.getElementById('btn-addToWatch');
  const btnAddToQueue = document.getElementById('btn-addToQueue');

  const save = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };

  btnAddToWatch.addEventListener('click', () => {
    let filmToWatchList = moviesArray.find((el) => el.id === IDFILMWATCHED);
    if (!dataBaseOfWatchedFilms.includes(filmToWatchList)) {
      dataBaseOfWatchedFilms.push(filmToWatchList);
    }
    save('WatchedFilms', dataBaseOfWatchedFilms);
  });

  btnAddToQueue.addEventListener('click', () => {
    let filmToQueue = moviesArray.find((el) => el.id === IDFILMQUEUE);
    if (!dataBaseOfQueueFilms.includes(filmToQueue)) {
      dataBaseOfQueueFilms.push(filmToQueue);
    }
    save('Queue', dataBaseOfQueueFilms);
  });
}
