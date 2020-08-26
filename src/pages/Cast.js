import React, { Component } from 'react';
import moviesApi from '../services/moviesApi';
import styles from './pages.module.css';

export class Cast extends Component {
  state = { cast: [] };

  componentDidMount() {
    moviesApi
      .fetchMovieCast(this.props.match.params.movieId)
      .then(cast => this.setState({ cast }));
  }

  componentDidUpdate(prevProps, prevState) {
    const prevCast = prevState.cast.length;
    const nextCast = this.state.cast.length;
    if (prevCast !== nextCast) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const { cast } = this.state;
    return (
      <ul className={styles.castList}>
        {cast.map(actor => (
          <li className={styles.castItem} key={actor.cast_id}>
            <img
              src={
                actor.profile_path
                  ? `http://image.tmdb.org/t/p/w92/${actor.profile_path}`
                  : actor.gender === 2
                  ? '/images/female.png'
                  : '/images/male.png'
              }
              alt={actor.name}
              width="92"
              height={actor.profile_path ? '138' : '92'}
            />
            <div className={styles.castName}>&#8226; {actor.name}</div>
            <div>Character: {actor.character}</div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Cast;
