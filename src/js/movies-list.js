import axios from 'axios';
import { API_KEY } from './config';
import { API_LANGUAGE } from './config';
import { API_URL } from './config';
import { TRENDING_URL } from './config';
const moviesContainer = document.querySelector('.covers-container');
const genresList = {};
const defaultMoviesURL = TRENDING_URL;
const TVGenresURL = `${API_URL}genre/tv/list?api_key=${API_KEY}&language=${API_LANGUAGE}`;
const movieGenresURL = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=${API_LANGUAGE}`;

const showMessage = () => {
  const messageOutput = document.getElementById('message');
  messageOutput.classList.remove('hidden');
};
const hideMessage = () => {
  const messageOutput = document.getElementById('message');
  messageOutput.classList.add('hidden');
};

const getGenres = async url => {
  try {
    const genresResponse = await axios.get(url);
    const genresArray = genresResponse.data.genres;

    genresArray.map(genre => {
      genresList[`${genre['id']}`] = genre.name;
    });

    return genresList;
  } catch (err) {
    throw err;
  }
};

const getMovies = async url => {
  try {
    const moviesResponse = await axios.get(url);
    const moviesArray = moviesResponse.data.results;
    return moviesArray;
  } catch (err) {
    throw err;
  }
};

export const renderMoviesList = async (searchURL = defaultMoviesURL) => {
  try {
    moviesContainer.innerHTML = '';
    await getGenres(movieGenresURL);
    await getGenres(TVGenresURL);

    const response = await getMovies(searchURL);
    listBuilder(response);
  } catch (err) {
    throw err;
  }
};

const listBuilder = moviesArray => {
  if (moviesArray.length === 0) {
    showMessage();
  }
  if (moviesArray.length !== 0) {
    hideMessage();
  }
  moviesArray.forEach(el => {
    // figure, cover container
    const movieCoverFigure = document.createElement('figure');
    movieCoverFigure.classList.add('cover__container');

    // span, label
    const moreDetailsLabel = document.createElement('span');
    moreDetailsLabel.classList.add('cover__label');
    moreDetailsLabel.innerHTML = `Click for more details`;

    //img
    const coverImg = document.createElement('img');
    coverImg.classList.add('cover__image');
    coverImg.setAttribute('src', `https://image.tmdb.org/t/p/w500${el['poster_path']}`);
    coverImg.setAttribute('alt', el['original_title']);
    coverImg.setAttribute('loading', 'lazy');
    const imgAtrribute = coverImg.getAttribute('src');
    if (imgAtrribute === 'https://image.tmdb.org/t/p/w500null') {
      coverImg.setAttribute('src', `noImage`);
      coverImg.setAttribute('alt', `no poster found`);
    }
    //title, genre
    const coverFigcaption = document.createElement('figcaption');
    coverFigcaption.classList.add('cover__figcaption');

    const movieTitle = document.createElement('h3');
    movieTitle.classList.add('cover__figcaption-title');

    let title = el['name'] || el['original_name'] || el['original_title'];
    if (title.length > 28) {
      title = title.substring(0, 28) + '...';
    }
    movieTitle.innerHTML = title.toUpperCase();
    movieTitle.setAttribute('title', el['name'] || el['original_name'] || el['original_title']); //tooltip

    const movieData = document.createElement('p');
    movieData.classList.add('cover__figcaption-movie-data');

    const movieGenresArray = [];

    if (el['genre_ids']) {
      for (const id of el['genre_ids']) {
        movieGenresArray.push(genresList[`${id}`]);
      }
    }
    const releaseDate = new Date(`${el['release_date'] || el['first_air_date']}`);
    const voteAverage = el['vote_average'].toFixed(1);
    movieData.innerHTML = `${movieGenresArray.join(
      ', ',
    )} | ${releaseDate.getFullYear()} | <span class = cover__figcaption-rating> ${voteAverage}</span>`;

    coverFigcaption.append(movieTitle);
    coverFigcaption.append(movieData);

    movieCoverFigure.append(coverImg);
    movieCoverFigure.append(moreDetailsLabel);
    movieCoverFigure.append(coverFigcaption);
    moviesContainer.append(movieCoverFigure);

    const movieIDInjection = document.querySelectorAll('[class^=cover_]');

    for (const tag of movieIDInjection) {
      if (tag.id === '') {
        tag.setAttribute('id', el['id']);
      }
    }
  });
};
