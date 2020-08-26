import { lazy } from 'react';

export default [
  {
    path: '/',
    label: 'Home',
    exact: true,
    component: lazy(() =>
      import('./pages/HomePage' /* webpackChunkName: "home-page" */),
    ),
  },
  {
    path: '/movies',
    label: 'Movies',
    exact: true,
    component: lazy(() =>
      import('./pages/MoviesPage' /* webpackChunkName: "movies-page" */),
    ),
  },
  {
    path: '/movies/:movieId',
    label: 'MovieDetails',
    component: lazy(() =>
      import(
        './pages/MovieDetailsPage' /* webpackChunkName: "movie-details" */
      ),
    ),
  },
];
