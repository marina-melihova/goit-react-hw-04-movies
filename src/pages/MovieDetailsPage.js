import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Cast from './Cast';
import Reviews from './Reviews';
import moviesApi from '../services/moviesApi';
import routes from '../routes';
import styles from './pages.module.css';

class MovieDetailsPage extends Component {
  state = { movie: null };

  componentDidMount() {
    moviesApi
      .fetchMovieDetails(this.props.match.params.movieId)
      .then(movie => this.setState({ movie }));
  }

  handleGoBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return this.props.history.push(state.from);
    }

    this.props.history.push(routes.movies);
  };

  render() {
    const { movie } = this.state;
    const { match } = this.props;
    const { state } = this.props.location;

    return (
      <>
        <button className="btn" type="button" onClick={this.handleGoBack}>
          &larr; Go back
        </button>
        <br />

        {movie && (
          <>
            <section className={styles.movie}>
              <img
                src={
                  movie.poster_path
                    ? `http://image.tmdb.org/t/p/w342/${movie.poster_path}`
                    : '/images/movie.jpg'
                }
                alt={movie.title}
                width="342"
              />
              <div className={styles.info}>
                <h1 className={styles.infoTitle}>{movie.title}</h1>
                <div className={styles.infoItem}>
                  User Score: {movie.vote_average * 10}%
                </div>
                <h2 className={styles.infoTitle}>Overview</h2>
                <div className={styles.infoItem}>{movie.overview}</div>
                <h3 className={styles.infoTitle}>Genres</h3>
                <div className={styles.infoItem}>
                  {movie.genres.map(genre => genre.name + ' ')}
                </div>
              </div>
            </section>
            <section className={styles.section}>
              <h3 className={styles.infoItem}>Additional information</h3>
              <ul className={styles.list}>
                <li>
                  <Link
                    to={{
                      pathname: `${match.url}/cast`,
                      state: { from: state?.from },
                    }}
                  >
                    Cast
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: `${match.url}/reviews`,
                      state: { from: state?.from },
                    }}
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </section>
          </>
        )}
        <Route path={`${match.path}/cast`} component={Cast} />
        <Route path={`${match.path}/reviews`} component={Reviews} />
      </>
    );
  }
}

export default MovieDetailsPage;
