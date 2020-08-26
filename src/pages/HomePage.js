import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Notification from '../components/notification/Notification';
import moviesApi from '../services/moviesApi';
import routes from '../routes';
import styles from './pages.module.css';

class HomePage extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    moviesApi
      .fetchMovieTrending()
      .then(movies => this.setState({ movies }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { movies, loading, error } = this.state;

    return (
      <>
        <h1 className={styles.title}>Trending today</h1>
        {loading && (
          <Loader type="Oval" color="#00BFFF" height={75} width={75} />
        )}
        {error && (
          <Notification message={`Something went wrong: ${error.message}`} />
        )}
        {movies.length > 0 && (
          <ul className={styles.list}>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
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

export default HomePage;
