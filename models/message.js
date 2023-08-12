const mongoose = require('mongoose')

const Message = mongoose.model('Message', {
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

module.exports = Message
