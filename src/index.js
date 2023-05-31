import './sass/main.scss';
import { renderPaginationButtons } from './js/pagination';
import { handleGenreClick } from './js/getMoviesByGenre';
import './js/team-list';
import { getMovies, renderMoviesList } from './js/movies-list';
import { openModal, closeModal, addMovie } from './js/details';
import { searchMovie } from './js/searchMovie';
import { renderLoadingSpinner } from './js/loadingSpinner';
import { popup, acceptCookies } from './js/cookies';
import './js/trailer';
import { loadLocalStorage, renderLocalStorage } from './js/loadLocalStorage';

// VARIABLES
const searchForm = document.getElementById('search-form');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

export const moviesContainer = document.querySelector('.covers-container');
const closeBtn = document.getElementById('close-modal');
const genresContainer = document.querySelector('.container-genres');

const linkLogIn = document.getElementById('login-link');
const linkLogOut = document.getElementById('logout-link');

const btnWatch = document.getElementById('btn-watched');
const btnQueue = document.getElementById('btn-queue');

const btnAddToWatch = document.getElementById('btn-addToWatch');
const btnAddToQueue = document.getElementById('btn-addToQueue');

// FIREBASE

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCc7Q1iBDkzj9T_-NMThRV3Tg2VNp92iZU',
  authDomain: 'goit---filmoteka-984a5.firebaseapp.com',
  projectId: 'goit---filmoteka-984a5',
  storageBucket: 'goit---filmoteka-984a5.appspot.com',
  messagingSenderId: '796832495137',
  appId: '1:796832495137:web:399844076cd89eef56d560',
};

// Import the functions you need from the SDKs you
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

import { loginUser, registerUser, logOutUser } from './js/authentication';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// STATE
export const state = {
  movies: [],
  page: 1,
  perPage: 20,
  totalPages: 0,
  query: '',
  genreId: undefined,
  watchedFilms: [],
  queueFilms: [],
};

// FUNCTIONS
const renderTrendingMovies = async () => {
  try {
    // 1. Render loading spinner
    renderLoadingSpinner(moviesContainer);
    // 2. Get trending movies
    const { results: movies, total_pages } = await getMovies(state.page);
    // 3. Set movies in state
    state.movies = movies;
    state.totalPages = Math.min(total_pages, 10);
    // 4. Render movies from state
    renderMoviesList(state.movies);
    // 5. Render pagination buttons
    renderPaginationButtons(state.totalPages);
  } catch (err) {
    console.error(err);
  }
};

const renderSearchedMovies = async (e) => {
  try {
    // 1. Get input value
    const formInput = e.target.elements.searchInput;
    if (!formInput) return;
    // 2. Render loading spinner
    renderLoadingSpinner(moviesContainer);
    // 3. Get movies query
    const { results: movies, total_pages } = await searchMovie(
      state.page,
      formInput.value,
      state.genreId
    );
    // 4. Set movies in state
    state.movies = movies;
    state.totalPages = Math.min(total_pages, 10);
    state.query = formInput.value.trim();
    // 5. Render movies from state
    renderMoviesList(state.movies);
    // 6. Render pagination buttons
    renderPaginationButtons(state.totalPages);
  } catch (err) {
    console.error(err);
  }
};

////////////////
// START

// Load localstorage
loadLocalStorage();

// Render trending movies on load
if (searchForm) {
  renderTrendingMovies();
}

// Render movies on search
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    state.page = 1;
    state.genreId = undefined;

    renderSearchedMovies(e);
  });
}

// Listeners

// Open modal
if (moviesContainer) {
  moviesContainer.addEventListener('click', openModal);
}

// Close modal
if (closeBtn) {
  closeBtn.addEventListener('click', closeModal);
}

// Filter movies by genre
if (genresContainer) {
  genresContainer.querySelectorAll('.genres').forEach((link) => {
    link.addEventListener('click', handleGenreClick);
  });
}

// Library sub-page
if (btnWatch && btnQueue) {
  let typeOfList = 'btn-watched'; // btn-watched or btn-queue
  renderLocalStorage(typeOfList);

  btnWatch.addEventListener('click', (ev) => {
    typeOfList = ev.currentTarget.id;
    renderLocalStorage(typeOfList);
  });

  btnQueue.addEventListener('click', (ev) => {
    typeOfList = ev.currentTarget.id;
    renderLocalStorage(typeOfList);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    // Register a new user with email and password
    const user = await registerUser({ auth, database, name, email, password });

    console.log('User signed in!' + user);
    window.location.href = '/';
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    // Register a new user with email and password
    const user = await loginUser({ auth, database, email, password });
    console.log('User logged in!', user);
    window.location.href = '/';
  });
}

// Auth
onAuthStateChanged(auth, (user) => {
  if (user) {
    linkLogOut?.classList.remove('is-hidden');
    linkLogIn?.classList.add('is-hidden');
  } else {
    linkLogOut.classList.add('is-hidden');
    linkLogIn.classList.remove('is-hidden');
  }
});

if (linkLogOut) {
  linkLogOut.addEventListener('click', async () => {
    await logOutUser(auth);
    window.location.href = '/';
  });
}

if (btnAddToWatch && btnAddToQueue) {
  btnAddToWatch.addEventListener('click', (e) => addMovie(e, auth, database));
  btnAddToQueue.addEventListener('click', (e) => addMovie(e, auth, database));
}
