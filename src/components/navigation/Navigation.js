import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './Navigation.module.css';

const Navigation = () => {
  const navs = routes.filter(route => route.label !== 'MovieDetails');
  return (
    <ul className={`container ${styles.navigation}`}>
      {navs.map(route => (
        <li key={route.label} className={styles.navigationItem}>
          <NavLink
            className={styles.navLink}
            activeClassName={styles.navLinkActive}
            to={route.path}
            exact
          >
            {route.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
