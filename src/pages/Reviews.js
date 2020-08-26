import React, { Component } from 'react';
import moviesApi from '../services/moviesApi';
import Notification from '../components/notification/Notification';
import ReadMore from '../components/readMore/ReadMore';

export class Reviews extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    moviesApi
      .fetchMovieReviews(this.props.match.params.movieId)
      .then(reviews => this.setState({ reviews }));
  }

  componentDidUpdate(prevProps, prevState) {
    const prevReviews = prevState.reviews.length;
    const nextReviews = this.state.reviews.length;
    if (prevReviews !== nextReviews) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const { reviews } = this.state;
    return reviews.length > 0 ? (
      <ul style={{ padding: 20 + 'px' }}>
        {reviews.map(review => (
          <li key={review.id}>
            <div style={{ fontWeight: 'bold', marginBottom: 10 + 'px' }}>
              Author: {review.author}
            </div>
            <div style={{ marginBottom: 20 + 'px' }}>
              <ReadMore text={review.content} length={400} />
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <Notification message="We don't have any reviews for this movie." />
    );
  }
}

export default Reviews;
