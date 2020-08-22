const baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '5b78e0b69521ece5befede9f92a99fec';

const fetchMovieDetails = movieId => {
  return fetch(
    `${baseURL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  ).then(res => res.json());
};

const fetchMovieCast = movieId => {
  return fetch(`${baseURL}/movie/${movieId}/credits?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => data.cast);
};

const fetchMovieWithQuery = searchQuery => {
  return fetch(
    `${baseURL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`,
  )
    .then(res => res.json())
    .then(data => data.results.map(({ id, title }) => ({ id, title })));
  // https://api.themoviedb.org/3/search/movie?api_key=''&language=en-US&query=batman&page=1&include_adult=false
};

const fetchMovieTrending = () => {
  return fetch(`${baseURL}/trending/movie/day?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => data.results.map(({ id, title }) => ({ id, title })));
};
//data.results.map(({ id, title }) => ({ id, title }))
export default {
  fetchMovieDetails,
  fetchMovieWithQuery,
  fetchMovieTrending,
  fetchMovieCast,
};
