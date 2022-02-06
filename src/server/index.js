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

const db = require('./dbModel');
const book = require('./Controller');

async function dbTest() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

async function dbSync() {
    await db.sequelize.sync({force: true});
    console.log('Synced DB');
}

var dummies = [
    {id: 1, title: 'Book 01', author: 'Author 01', genre: 'Gen 01', price: 15},
    {id: 2, title: 'Book 02', author: 'Author 02', genre: 'Gen 02', price: 10},
    {id: 3, title: 'Book 03', author: 'Author 03', genre: 'Gen 03', price: 20},
    {id: 4, title: 'Book 04', author: 'Author 04', genre: 'Gen 04', price: 25},
    {id: 5, title: 'Book 05', author: 'Author 05', genre: 'Gen 05', price: 18},
    {id: 6, title: 'Book 06', author: 'Author 06', genre: 'Gen 06', price: 30},
];

app.get('/', (req, res) => {
    res.send("Hello");
})

app.get('/books', book.findAll);

app.post('/books/new', book.create);

app.put('/books/:id', book.update);

app.delete('/books/:id', book.delete);

app.listen(port, ()=> {
    dbTest();
    dbSync();
    console.log(`Listening on port ${port}`);
});