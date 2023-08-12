const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const port = process.env.PORT || 4000
require('./mongoose')
const messageRouter = require('./routes/message')
const bookRouter = require('./routes/book')

const app = express()
app.set('view engine', 'hbs')

const server = http.createServer(app)

const io = socketio(server, {
  cors: {
    origin: 'https://sag.netlify.app/',
  },
})

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

io.on('connection', socket => {
  socket.on('join', ({ username, room }) => {
    socket.join(room)

    socket.on('text', value => {
      io.to(room).emit('message', {
        name: username,
        content: value,
      })
    })
  })
})

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.use('/message', messageRouter)
app.use('/book', bookRouter)

server.listen(port, () => {
  console.log(`Server running on port (${port})`)
})
