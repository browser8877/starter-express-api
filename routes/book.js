const express = require('express')

const app = express()

const router = express.Router()
const Book = require('../models/book')

router.post('/', async (req, res) => {
  const book = new Book(req.body)

  try {
    await book.save()
    res.render('book', {
      name: book.name,
      author: book.author,
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const books = await Book.find({})

    res.send(books)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
