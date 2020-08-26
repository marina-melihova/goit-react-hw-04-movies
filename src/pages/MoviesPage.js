import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import getQueryParams from '../utils/get-query-params';
import SearchBox from '../components/searchBox/SearchBox';
import Notification from '../components/notification/Notification';
import moviesApi from '../services/moviesApi';
import styles from './pages.module.css';

class MoviesPage extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
    message: '',
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);

    if (query) {
      this.fetchMovies(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      if (!nextQuery) {
        this.setState({ movies: [] });
        return;
      }
      this.fetchMovies(nextQuery);
    }
  }

  fetchMovies = query => {
    this.setState({ loading: true });
    moviesApi
      .fetchMovieWithQuery(query)
      .then(movies => {
        if (movies.length) {
          this.setState({ movies });
        } else {
          this.setState({ message: 'No movies found for your search' });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleChangeQuery = query => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
    this.setState({ movies: [], message: '' });
  };

  render() {
    const { movies, loading, error, message } = this.state;
    const { match } = this.props;

    return (
      <>
        <SearchBox onSubmit={this.handleChangeQuery} />
        {loading && (
          <Loader type="Oval" color="#00BFFF" height={75} width={75} />
        )}
        {error && (
          <Notification message={`Something went wrong: ${error.message}`} />
        )}
        {message && <Notification message={message} />}
        {movies.length > 0 && (
          <ul className={styles.list}>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `${match.url}/${movie.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default MoviesPage;
