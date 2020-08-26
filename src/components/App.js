import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './header/Header';
import routes from '../routes';
import styles from './App.module.css';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className={`container ${styles.main}`}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            {routes.map(route => (
              <Route key={route.label} {...route} />
            ))}
          </Switch>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

export default App;
