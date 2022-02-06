const db = require('./dbModel');
const Book = db.books;

// Create and Save a new Book
exports.create = (req, res) => {

    // Create Boook
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        price: req.body.price,
    }

    // Save Book in DB
    Book.create(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the book"
            })
        })
}

// Retrieve Books from database
exports.findAll = (req, res) => {
    
    // Retrieve all Books
    Book.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books"
            })
        })
}

// Update a Book by id from request
exports.update = (req, res) => {
    const id = req.params.id;

    // Update Book by id
    Book.update(req.body, {
            where: {id: id}
        })
        .then(count => {
            if (count == 1) {
                res.send({
                    message: 'Book was updated successfully'
                })
            } else {
                res.send({
                    message: `Cannot update book with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating books"
            })
        })
}

// Delete specified Book by id from request
exports.delete = (req, res) => {
    const id = req.params.id;

    // Delete Book by id
    Book.destroy({
            where: {id: id}
        })
        .then(count => {
            if (count == 1) {
                res.send({
                    message: 'Book was deleted successfully'
                })
            } else {
                res.send({
                    message: `Cannot delete book with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting books"
            })
        })

}