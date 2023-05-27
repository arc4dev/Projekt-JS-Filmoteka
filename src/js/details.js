import { API_KEY } from './config';
import { API_LANGUAGE } from './config';
import { API_URL } from './config';
import { API_IMG_URL } from './config';

// Elements
const modal = document.getElementById('details-modal');
const closeBtn = document.getElementById('close-modal');
const moviesContainer = document.querySelector('.covers-container');
const movieTitleEl = document.getElementById('movieTitle');
const movieVoteEl = document.getElementById('movieVote');
const moviePopularityEl = document.getElementById('moviePopularity');
const movieOriginalTitleEl = document.getElementById('movieOriginalTitle');
const movieGenreEl = document.getElementById('movieGenre');
const movieAboutEl = document.getElementById('movieAbout');
const movieCoverEl = document.getElementById('movieCover');

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
  movieCoverEl.appendChild(movieCoverImg);
};

// Get genres names
const getGenreNames = (genres) => {
  return genres.map((genre) => genre.name).join(', ');
};

// Close modal
const closeModal = () => {
  modal.style.display = 'none';
};

// Add listeners
moviesContainer.addEventListener('click', openModal);

// Close modal on close
closeBtn.addEventListener('click', closeModal);

// Close modal on Escape key press
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Close modal when clicked outside of modal content
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

export { openModal, closeModal };
