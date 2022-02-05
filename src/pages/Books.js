import { 
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    makeStyles
} from '@material-ui/core';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon} from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    actionBtn: {
        margin: theme.spacing(1),
    }
}));

class Books extends React.Component {
    state = {
        loading: true,
        books: [],
        error: null
    }

    componentDidMount() {
        this.setState({loading: false});
    }

    add = () => {
        let id = this.props.params.id;
        if(id) {
            this.setState({
                    books: [...this.state.books].map(book => {
                    if (book.id === +id) {
                        return {
                            ...book,
                            title: `New Book ${id}`,
                        }
                    } else {
                        return book;
                    }
                })
            });
        } else {
            id = this.state.books.length + 1;
            this.setState({
                books: [
                    ...this.state.books,
                    {id, title: `Book ${id}`, author: `Author ${id}`, genre: `gen ${id}`, price: id*10}
                ],
            });
        }
        this.props.navigate(-1);
    }

    async deleteBook(book) {
        if(window.confirm(`Are you sure to delete ${book.title}`)) {
            //await Delete
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <>
                <div className={classes.header}>
                    <Typography variant="h4">Books Manager</Typography>
                    <Button 
                        variant='contained'
                        color='primary'
                        component={Link}
                        to='/books/edit'
                        startIcon={<AddIcon/>}>New</Button>
                </div>
                {this.state.books.length > 0 ? (
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
                                {this.state.books.map(book => (
                                    <TableRow key={book.id}>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{book.genre}</TableCell>
                                        <TableCell align='right'>{book.price}</TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                className={classes.actionBtn}
                                                variant='contained'
                                                size='small'
                                                component={Link}
                                                to={`/books/${book.id}`}
                                                startIcon={<EditIcon />}>Edit</Button>
                                            <Button
                                                className={classes.actionBtn}
                                                variant='contained'
                                                size='small'
                                                color='secondary'
                                                onClick={() => this.deleteBook(book)}
                                                startIcon={<DeleteIcon />}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    !this.state.loading && <Typography variant='subtitle1'>No books to show</Typography>
                )}

                <Outlet context={[this.add]} />
            </>
        )
    }
}

export default function(props) {
    const navigate = useNavigate();
    const classes = useStyles();
    const params = useParams();

    return <Books {...props} navigate={navigate} classes={classes} params={params} />
}