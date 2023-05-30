import { API_KEY } from './config';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { API_URL } from './config';

const trailerBtn = document.getElementById('btn-trailer');

const closeModalHandler = (ev) => {
  if (ev.code === 'Escape') {
    modal.close();
  }
  window.removeEventListener('keydown', closeModalHandler);
};

trailerBtn.addEventListener('click', async () => {
  const movieId = trailerBtn.dataset.trailer;

  const url = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const trailerKey = data.results[0].key;

    const content = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    const lightbox = basicLightbox.create(content);
    lightbox.show();

    window.addEventListener('keydown', closeModalHandler);
  } catch (error) {
    console.error('Error:', error);
  }
});
