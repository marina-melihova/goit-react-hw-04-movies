import React, { Component } from 'react';
import styles from './SearchBox.module.css';

class SearchBox extends Component {
  state = { value: '' };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className={styles.inputQuery}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default SearchBox;
