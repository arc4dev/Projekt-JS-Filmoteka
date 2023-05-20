import axios from 'axios';
import { API_KEY } from './config';
import { API_LANGUAGE } from './config';

const moviesContainer = document.querySelector('.covers-container');
const genresList = {};
const defaultMoviesURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const TVGenresURL = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=${API_LANGUAGE}`;
const movieGenresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${API_LANGUAGE}`;

const getGenres = async url => {
  const genresResponse = await axios.get(url);
  const genresArray = genresResponse.data.genres;

  genresArray.map(genre => {
    genresList[`${genre['id']}`] = genre.name;
  });

  return genresList;
};

const getMovies = async url => {
  const moviesResponse = await axios.get(url);
  const moviesArray = moviesResponse.data.results;

  return moviesArray;
};

const getDataFromAPI = async (searchURL = defaultMoviesURL) => {
  moviesContainer.innerHTML = '';
  // zmienne do importu
  const movieGenres = await getGenres(movieGenresURL);
  const tvGenres = await getGenres(TVGenresURL);
  const moviesList = getMovies(searchURL).then(response => {
    listBuilder(response);
  });
};

const listBuilder = moviesArray => {
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
      coverImg.setAttribute('src', `${noImage}`);
      coverImg.setAttribute('alt', `no poster found`);
    }
    //title, genre
    const coverFigcaption = document.createElement('figcaption');
    coverFigcaption.classList.add('cover__figcaption');

    const movieTitle = document.createElement('h3');
    movieTitle.classList.add('cover__figcaption-title');

    movieTitle.innerHTML = el['name'] || el['original_name'] || el['original_title'];

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
    )} | ${releaseDate.getFullYear()} | Rating: ${voteAverage}`;

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

getDataFromAPI();
