import { 
    Button,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

function Books() {
    const classes = useStyles();

    return (
        <>
            <headtitle className={classes.header}>
                <Typography variant="h4">Books Manager</Typography>
                <Button variant='contained' color='primary' startIcon={<AddIcon/>}>New</Button>
            </headtitle>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell align='right'>Unit Price ($)</TableCell>
                            <TableCell align='right'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Books;