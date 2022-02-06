import React from 'react';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { LibraryBooks } from '@material-ui/icons';
import { Link } from 'react-router-dom';

class AppHeader extends React.Component {
    render() {
        return (
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <LibraryBooks />
                    </IconButton>
                    <Typography variant="h6">
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to='/'>Book Store</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default AppHeader;