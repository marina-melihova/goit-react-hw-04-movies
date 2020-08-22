import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moviesApi from '../services/moviesApi';
import routes from '../routes';

class HomePage extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    moviesApi.fetchMovieTrending().then(movies => this.setState({ movies }));
  }

  render() {
    const { movies } = this.state;

    return (
      <>
        <h1>Trending today</h1>
        {movies.length > 0 && (
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `${routes.movies}/${movie.id}`,
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
