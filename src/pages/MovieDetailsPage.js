import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Cast from './Cast';
import moviesApi from '../services/moviesApi';
import routes from '../routes';

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
    const pathBack = state ? state.from : routes.movies;
    return (
      <>
        <button type="button" onClick={this.handleGoBack}>
          Назад к списку шоу
        </button>
        <br />

        {movie && (
          <>
            <img
              src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              alt={movie.title}
            />
            <h1>{movie.title}</h1>
            <hr />
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `${match.url}/cast`,
                    state: { from: pathBack },
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link to={`${match.url}/reviews`}>Reviews</Link>
              </li>
            </ul>
            <hr />
          </>
        )}
        <Route path={`${match.path}/cast`} component={Cast} />
      </>
    );
  }
}

export default MovieDetailsPage;
