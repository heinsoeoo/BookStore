import { Button, Card, CardActions, CardContent, CardHeader, makeStyles, Modal, TextField } from '@material-ui/core';
import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCard: {
        width: '90%',
        maxWidth: 500,
    },
    modalCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    marginTop: {
        marginTop: theme.spacing(2),
    },
}));

const BookEditor = () => {
    const classes = useStyles();
    let navigate = useNavigate();
    let [addBook, book] = useOutletContext();

    return(
    <Modal
        className={classes.modal}
        onClose={()=> navigate(-1)}
        open>
        <Card className={classes.modalCard}>
            <form autoComplete='off' onSubmit={addBook}>
                <CardHeader title='Book Editor'/>
                <CardContent className={classes.modalCardContent}>
                    <TextField name='title' label='Book Title' defaultValue={book? book.title: ''} required/>
                    <TextField className={classes.marginTop} name='author' label='Author Name' defaultValue={book? book.author: ''} required/>
                    <TextField className={classes.marginTop} name='genre' label='Genre' defaultValue={book? book.genre: ''} required/>
                    <TextField className={classes.marginTop} name='price' label='Unit Price ($)' type='number' defaultValue={book? book.price: ''} required/>
                </CardContent>
                <CardActions>
                    <Button size='small' color='primary' type='submit'>Save</Button>
                    <Button size='small' onClick={() => navigate(-1)}>Cancel</Button>
                </CardActions>
            </form>
        </Card>
    </Modal>
)
}

export default BookEditor;