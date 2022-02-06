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

const API = process.env.REACT_APP_API || 'http://localhost:3001';

class Books extends React.Component {
    state = {
        loading: true,
        books: [],
        error: null
    }

    componentDidMount() {
        this.getBooks();
    }

    async fetch(method, endpoint, data) {
        const response = await fetch(`${API}${endpoint}`, {
            method,
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                accept: 'applicatin/json',
            }
        });
        return await response.json();
    }

    // Fetch Book Data
    async getBooks() {
        this.setState({loading: false, books: (await this.fetch('GET', '/books')) || []});
    }

    saveBook = async (book) => {
        if (book.id) {
            await this.fetch('PUT', `/books/${book.id}`, book);
        } else {
            await this.fetch('POST', '/books/new', book);
        }

        this.props.navigate(-1);
        await this.getBooks();
    }

    // Create or update book
    addBook = async (event) => {
        if (this.state.loading) return null;
        
        event.preventDefault();
        let id = this.props.params.id;
        let book = {
            title: event.target.title.value,
            author: event.target.author.value,
            genre: event.target.genre.value,
            price: event.target.price.value
        }
        
        let chkBook = await this.state.books.find(book => book.id==id);
        if(!chkBook && id !== 'new') {
            this.props.navigate('/books')
        };
        if (chkBook) book.id=chkBook.id;
        await this.saveBook(book);
    }

    async deleteBook(book) {
        if(window.confirm(`Are you sure to delete ${book.title}`)) {
            await this.fetch('DELETE', `/books/${book.id}`);
            await this.getBooks();
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
                        to='/books/new'
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

                <Outlet context={[this.addBook, this.state.books.find(book => book.id==+this.props.params.id)]} />
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