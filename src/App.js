import React, { Fragment } from 'react';

import AppHeader from './components/AppHeader';
import Books from './pages/Books';
import Home from './pages/Home';

import { CssBaseline, withStyles } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookEditor from './components/BookEditor';

const styles = theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
})

const App = ({classes}) => (
  <Fragment>
    <Router>
      <CssBaseline />
      <AppHeader />
      <main className={classes.main}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/books' element={<Books />}>
              <Route exact path='edit' element={<BookEditor />} />
              <Route exact path=':id' element={<BookEditor />} />
            </Route>
          </Routes>
      </main>
    </Router>
  </Fragment>
);

export default withStyles(styles)(App);
