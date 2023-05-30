import axios from 'axios';
import noImage from '../images/movie.png';
import { API_KEY } from './config';
import { API_LANGUAGE } from './config';
import { API_URL } from './config';
import { TRENDING_URL } from './config';

const moviesContainer = document.querySelector('.covers-container');
export const genresList = {};
const defaultMoviesURL = TRENDING_URL;
const TVGenresURL = `${API_URL}genre/tv/list?api_key=${API_KEY}&language=${API_LANGUAGE}`;
const movieGenresURL = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=${API_LANGUAGE}`;

// const showMessage = () => {
//   const messageOutput = document.getElementById('message');
//   messageOutput.classList.remove('hidden');
// };
// const hideMessage = () => {
//   const messageOutput = document.getElementById('message');
//   messageOutput.classList.add('hidden');
// };

const getGenres = async (url) => {
  try {
    const genresResponse = await axios.get(url);
    const genresArray = genresResponse.data.genres;

    genresArray.map((genre) => {
      genresList[`${genre['id']}`] = genre.name;
    });

    return genresList;
  } catch (err) {
    throw err;
  }
};

const convertElementsToHTMLString = (elements) => {
  let htmlString = '';

  // Iterate through each element in the array
  elements.forEach((element) => {
    htmlString += element.outerHTML;
  });

  return htmlString;
};

export const getMovies = async (page = 1, url = defaultMoviesURL) => {
  try {
    const moviesResponse = await axios.get(`${url}&page=${page}`);
    console.log(moviesResponse.data);
    return moviesResponse.data;
  } catch (err) {
    throw err;
  }
};

export const renderMoviesList = async (moviesArr) => {
  try {
    await getGenres(movieGenresURL);
    await getGenres(TVGenresURL);

    // Build movies elements
    const movies = listBuilder(moviesArr);
    // Convert it to HTML STRING
    const moviesHTML = convertElementsToHTMLString(movies);

    // Insert it into container
    moviesContainer.innerHTML = '';
    moviesContainer.insertAdjacentHTML('beforeend', moviesHTML);
  } catch (err) {
    throw err;
  }
};

const listBuilder = (moviesArray) => {
  // if (moviesArray.length === 0) {
  //   showMessage();
  // }
  // if (moviesArray.length !== 0) {
  //   hideMessage();
  // }
  return moviesArray.map((el) => {
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
    coverImg.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500${el['poster_path']}`
    );
    coverImg.setAttribute('alt', el['title']);
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

    let title = el['name'] || el['original_name'] || el['title'];
    if (title.length > 28) {
      title = title.substring(0, 28) + '...';
    }
    movieTitle.innerHTML = title.toUpperCase();
    movieTitle.setAttribute(
      'title',
      el['name'] || el['original_name'] || el['title']
    ); //tooltip

    const movieData = document.createElement('p');
    movieData.classList.add('cover__figcaption-movie-data');

    const movieGenresArray = [];

    if (el['genre_ids']) {
      for (const id of el['genre_ids']) {
        movieGenresArray.push(genresList[`${id}`]);
      }
    }

    const releaseDate = el['release_date'] || el['first_air_date'];
    const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : '';
    const voteAverage = el['vote_average'] ? el['vote_average'].toFixed(1) : '';

    movieData.innerHTML = `${movieGenresArray.join(', ')}${
      movieGenresArray.length > 0 ? '  ' : ''
    }${releaseYear ? ' | ' + releaseYear : ''}${
      voteAverage
        ? ` <span class="cover__figcaption-rating">${voteAverage}</span>`
        : ''
    }`;

    coverFigcaption.append(movieTitle);
    coverFigcaption.append(movieData);

    movieCoverFigure.append(coverImg);
    movieCoverFigure.append(moreDetailsLabel);
    movieCoverFigure.append(coverFigcaption);

    movieCoverFigure.setAttribute('id', el['id']);

    return movieCoverFigure;
  });
};
