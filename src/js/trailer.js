import { API_KEY } from './config';
import { API_URL } from './config';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { Notify } from 'notiflix';

const trailerBtn = document.getElementById('btn-trailer');
let lightboxInstance;

const closeModalHandler = (ev) => {
  if (ev.code === 'Escape') {
    lightboxInstance.close();
  }
};

// trailerBtn.addEventListener('click', async () => {
//   const movieId = trailerBtn.dataset.trailer;

//   const url = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data.results);
//     console.log(data.results.length);

//     if (data.results.length === 0) {
//       throw new Error(
//         'We apologize, but there is no trailer available for this movie.'
//       );
//     }

//     const trailerKey = data.results[0].key;

// const content = `<iframe width="800" height="450" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

// lightboxInstance = basicLightbox.create(content);
// lightboxInstance.show();

// window.addEventListener('keydown', closeModalHandler);
//   } catch (error) {
//     Notify.failure(
//       'We apologize for the inconvenience, but an unexpected error has occurred.'
//     );
//   }
// });

trailerBtn.addEventListener('click', async () => {
  const movieId = trailerBtn.dataset.trailer;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const url = `${API_URL}movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.results.length > 0) {
      const trailerKey = data.results[0].key;

      const content = `<iframe width="800" height="450" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      lightboxInstance = basicLightbox.create(content);
      lightboxInstance.show();

      window.addEventListener('keydown', closeModalHandler);
    } else {
      Notify.warning(
        'We apologize, but there is no trailer available for this movie.'
      );
    }
  } catch (error) {
    Notify.failure(
      'We apologize for the inconvenience, but an unexpected error has occurred.'
    );
    console.error(error);
  }
});
