require('dotenv').config({path: '.env.local'});

const express = require('express');
const cors = require('cors');
const port = process.env.SERVER_PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

var data = [
    {id: 1, title: 'Book 01', author: 'Author 01', genre: 'Gen 01', price: 15},
    {id: 2, title: 'Book 02', author: 'Author 02', genre: 'Gen 02', price: 10},
    {id: 3, title: 'Book 03', author: 'Author 03', genre: 'Gen 03', price: 20},
    {id: 4, title: 'Book 04', author: 'Author 04', genre: 'Gen 04', price: 25},
    {id: 5, title: 'Book 05', author: 'Author 05', genre: 'Gen 05', price: 18},
    {id: 6, title: 'Book 06', author: 'Author 06', genre: 'Gen 06', price: 30},
];

app.get('/books', (req,res) => {
    res.json(data)
});

app.post('/books/new', (req,res) => {
    data = [...data, req.body];
    res.json({isSuccess: true});
});

app.put('/books/:id', (req,res) => {
    data = data.map(book => {
        if (book.id == req.params.id) {
            return req.body;
        }else {
            return book;
        }
    });
    res.json({isSuccess: true});
});

app.delete('/books/:id', (req,res) => {
    data = data.filter(book => book.id!==+req.params.id);
    res.json({isSuccess: true});
});

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});