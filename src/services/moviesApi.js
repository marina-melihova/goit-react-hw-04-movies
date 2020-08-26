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

const fetchMovieReviews = movieId => {
  return fetch(
    `${baseURL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  )
    .then(res => res.json())
    .then(data => data.results);
};

const fetchMovieWithQuery = searchQuery => {
  return fetch(
    `${baseURL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`,
  )
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      if (!data.total_results) {
        return [];
      }
      return data.results.map(({ id, title }) => ({ id, title }));
    });
};

const fetchMovieTrending = () => {
  return fetch(`${baseURL}/trending/movie/day?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => data.results.map(({ id, title }) => ({ id, title })));
};

export default {
  fetchMovieDetails,
  fetchMovieWithQuery,
  fetchMovieTrending,
  fetchMovieCast,
  fetchMovieReviews,
};
