const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
})

module.exports = Book
