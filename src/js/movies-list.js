import axios from 'axios';
import noImage from '../images/movie.png';
import { API_KEY, API_LANGUAGE, API_URL, TRENDING_URL } from './config';

const moviesContainer = document.querySelector('.covers-container');
const genresList = {};

const getGenres = async (url) => {
  try {
    const genresResponse = await axios.get(url);
    const genresArray = genresResponse.data.genres;

    genresArray.forEach((genre) => {
      genresList[genre.id] = genre.name;
    });

    return genresList;
  } catch (err) {
    throw err;
  }
};

const convertElementsToHTMLString = (elements) => {
  return elements.map((element) => element.outerHTML).join('');
};

const getMovies = async (page = 1, url = TRENDING_URL) => {
  try {
    const moviesResponse = await axios.get(`${url}&page=${page}`);
    return moviesResponse.data;
  } catch (err) {
    throw err;
  }
};

const buildMovieCover = (movie) => {
  const movieCoverFigure = document.createElement('figure');
  movieCoverFigure.classList.add('cover__container');

  const moreDetailsLabel = document.createElement('span');
  moreDetailsLabel.classList.add('cover__label');
  moreDetailsLabel.innerHTML = `Click for more details`;

  const coverImg = document.createElement('img');
  coverImg.classList.add('cover__image');
  const imgPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : noImage;
  coverImg.setAttribute('src', imgPath);
  coverImg.setAttribute('alt', movie.title);
  coverImg.setAttribute('loading', 'lazy');

  const coverFigcaption = document.createElement('figcaption');
  coverFigcaption.classList.add('cover__figcaption');

  const movieTitle = document.createElement('h3');
  movieTitle.classList.add('cover__figcaption-title');
  let title = movie.name || movie.original_name || movie.title;
  title = title.length > 28 ? title.substring(0, 28) + '...' : title;
  movieTitle.innerHTML = title.toUpperCase();
  movieTitle.setAttribute(
    'title',
    movie.name || movie.original_name || movie.title
  );

  const movieData = document.createElement('p');
  movieData.classList.add('cover__figcaption-movie-data');

  const movieGenresArray = movie.genre_ids
    ? movie.genre_ids.map((id) => genresList[id])
    : [];

  const releaseDate = movie.release_date || movie.first_air_date;
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const voteAverage = movie.vote_average ? movie.vote_average.toFixed(1) : '';

  movieData.innerHTML = `${movieGenresArray.join(', ')}${
    movieGenresArray.length > 0 ? '  ' : ''
  }${releaseYear ? ' | ' + releaseYear : ''}${
    voteAverage
      ? ` <span class="cover__figcaption-rating">${voteAverage}</span>`
      : ''
  }`;

  coverFigcaption.appendChild(movieTitle);
  coverFigcaption.appendChild(movieData);

  movieCoverFigure.appendChild(coverImg);
  movieCoverFigure.appendChild(moreDetailsLabel);
  movieCoverFigure.appendChild(coverFigcaption);

  movieCoverFigure.setAttribute('id', movie.id);

  return movieCoverFigure;
};

const renderMoviesList = async (moviesArr) => {
  try {
    await getGenres(
      `${API_URL}genre/movie/list?api_key=${API_KEY}&language=${API_LANGUAGE}`
    );
    await getGenres(
      `${API_URL}genre/tv/list?api_key=${API_KEY}&language=${API_LANGUAGE}`
    );

    const movies = moviesArr.map((movie) => buildMovieCover(movie));
    const moviesHTML = convertElementsToHTMLString(movies);

    moviesContainer.innerHTML = '';
    moviesContainer.insertAdjacentHTML('beforeend', moviesHTML);
  } catch (err) {
    throw err;
  }
};

export { getMovies, renderMoviesList, genresList };
