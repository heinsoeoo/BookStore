import { Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import Img from '../books.svg';

const Home = () => (
    <>
        <Typography variant='h4' align='center'>Welcome to Book Store!</Typography>
        <Typography variant='subtitle1' align='center'>Manage your books 
            <Button color='primary' component={Link} to='/books'>here</Button>
        </Typography>
        <Grid align='center' style={{paddingTop: '8px'}}>
            <img src={Img} style={{width: '100%'}}></img>
        </Grid>
    </>
)

export default Home;