import './sass/main.scss';
import './js/team-list';
import { renderLoadingSpinner } from './js/loadingSpinner';
import { popup, acceptCookies } from './js/cookies';
import { openModal, closeModal } from './js/details';
import './js/trailer';

// // VARIABLES
export const moviesContainer = document.querySelector('.covers-container');
const closeBtn = document.getElementById('close-modal');

// ////////////////
// // START

// Listeners

// Open modal
moviesContainer.addEventListener('click', openModal);

// Close modal
closeBtn.addEventListener('click', closeModal);
