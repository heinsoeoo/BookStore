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
    let [add] = useOutletContext();

    return(
    <Modal
        className={classes.modal}
        onClose={()=> navigate(-1)}
        open>
        <Card className={classes.modalCard}>
            <form autoComplete='off'>
                <CardHeader title='Book Editor'/>
                <CardContent className={classes.modalCardContent}>
                    <TextField label='Book Title' required/>
                    <TextField className={classes.marginTop} label='Author Name' required/>
                    <TextField className={classes.marginTop} label='Genre' required/>
                    <TextField className={classes.marginTop} label='Unit Price ($)' required/>
                </CardContent>
                <CardActions>
                    <Button size='small' color='primary' onClick={add}>Save</Button>
                    <Button size='small' onClick={() => navigate(-1)}>Cancel</Button>
                </CardActions>
            </form>
        </Card>
    </Modal>
)
}

export default BookEditor;