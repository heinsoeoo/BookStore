import React, { Fragment } from 'react';

import AppHeader from './components/AppHeader';
import Books from './pages/Books';

import { CssBaseline, withStyles } from '@material-ui/core';

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
    <CssBaseline />
    <AppHeader />
    <main className={classes.main}>
      <Books />
    </main>
  </Fragment>
);

export default withStyles(styles)(App);
