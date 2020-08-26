import React, { Component } from 'react';
import styles from './ReadMore.module.css';

class ReadMore extends Component {
  state = { showMore: false };
  toggleShow = () => {
    this.setState(prevState => ({ showMore: !prevState.showMore }));
  };

  render() {
    const { text, length } = this.props;
    const { showMore } = this.state;
    return text.length < length ? (
      <p>{text}</p>
    ) : (
      <p>
        {!showMore ? `${text.slice(0, length)}...` : text}
        <button className={styles.btn} onClick={this.toggleShow}>
          Read {showMore ? 'Less' : 'More'}
        </button>
      </p>
    );
  }
}

export default ReadMore;
