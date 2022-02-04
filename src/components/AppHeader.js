import React from 'react';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

function AppHeader(classes) {
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Book Store
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;