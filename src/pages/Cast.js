import React, { Component } from 'react';
import moviesApi from '../services/moviesApi';

export class Cast extends Component {
  state = { cast: [] };

  componentDidMount() {
    moviesApi
      .fetchMovieCast(this.props.match.params.movieId)
      .then(data => this.setState({ cast: data }));
    // this.setState({ cast: data })
  }

  render() {
    const { cast } = this.state;
    return (
      <ul>
        {cast.map(actor => (
          <li key={actor.cast_id}>{actor.name}</li>
        ))}
      </ul>
    );
  }
}

export default Cast;
