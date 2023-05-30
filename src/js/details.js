import { API_KEY } from './config';
import { API_LANGUAGE } from './config';
import { API_URL } from './config';
import { API_IMG_URL } from './config';
import noImage from '../images/movie.png';
// Elements
const modal = document.getElementById('details-modal');
const movieTitleEl = document.getElementById('movieTitle');
const movieVoteEl = document.getElementById('movieVote');
const moviePopularityEl = document.getElementById('moviePopularity');
const movieOriginalTitleEl = document.getElementById('movieOriginalTitle');
const movieGenreEl = document.getElementById('movieGenre');
const movieAboutEl = document.getElementById('movieAbout');
const movieCoverEl = document.getElementById('movieCover');
const trailerBtn = document.getElementById('btn-trailer');

// Open modal
const openModal = async (ev) => {
  const clickedEl = ev.target;
  const movieCard = clickedEl.closest('.cover__container');
  if (movieCard) {
    const movieId = movieCard.id;
    const movieData = await fetchMovieData(movieId);
    if (movieData) {
      populateModalContent(movieData);
      modal.style.display = 'block';
      window.addEventListener('keydown', handleEscapeKey);
      window.addEventListener('click', handleClickOutsideModal);

      trailerBtn.dataset.trailer = movieId;
    }
  }
};

// Get movie ID
const fetchMovieData = async (movieId) => {
  const url = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Display movie information in modal
const populateModalContent = (movieData) => {
  movieTitleEl.textContent = movieData.title;
  movieVoteEl.innerHTML = `<span class="details__info--special">${movieData.vote_average.toFixed(
    1
  )}</span> / ${movieData.vote_count}`;
  moviePopularityEl.textContent = `${movieData.popularity.toFixed(1)}`;
  movieOriginalTitleEl.textContent = `${movieData.original_title}`;
  movieGenreEl.textContent = `${getGenreNames(movieData.genres)}`;
  movieAboutEl.textContent = `${movieData.overview}`;
  movieCoverEl.innerHTML = '';
  const movieCoverImg = document.createElement('img');
  movieCoverImg.src = `${API_IMG_URL}${movieData.poster_path}`;
  movieCoverImg.alt = `${movieData.title} Cover`;
  if (movieCoverImg.src === 'https://image.tmdb.org/t/p/w500null') {
    movieCoverImg.src = `${noImage}`;
  }
  movieCoverEl.appendChild(movieCoverImg);
};

// Get genres names
const getGenreNames = (genres) => {
  return genres.map((genre) => genre.name).join(', ');
};

// Close modal
const closeModal = () => {
  modal.style.display = 'none';
  window.removeEventListener('keydown', closeModal);
  modal.removeEventListener('click', closeModal);
};

// Listener for Escape
const handleEscapeKey = (ev) => {
  if (ev.key === 'Escape') {
    closeModal();
  }
};

// Listener for click outside modal
const handleClickOutsideModal = (ev) => {
  if (ev.target === modal) {
    closeModal();
  }
};

export { modal, openModal, closeModal };
