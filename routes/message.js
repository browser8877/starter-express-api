const express = require('express')

const app = express()
const router = express.Router()
const Message = require('../models/message')

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find({})

    res.send(messages)
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/', async (req, res) => {
  const message = new Message(req.body)

  try {
    await message.save()
    res.status(201).send(message)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
