import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';

const Home = () => (
    <>
        <Typography variant='h4'>Welcome to Book Store!</Typography>
        Check Books <Link to='/books'>here</Link>
    </>
)

export default Home;