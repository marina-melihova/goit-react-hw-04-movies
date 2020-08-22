import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <NavLink
          className="navLink"
          activeClassName="navLinkActive"
          to={routes.home}
          exact
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="navLink"
          activeClassName="navLinkActive"
          to={routes.movies}
          exact
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
