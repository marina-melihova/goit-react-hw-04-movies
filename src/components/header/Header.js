import React from 'react';
import Navigation from '../navigation/Navigation';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      {/* <div className="container"> */}
      <Navigation />
      {/* </div> */}
    </header>
  );
};

export default Header;
