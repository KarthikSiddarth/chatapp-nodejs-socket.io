const https = require('https')

const options = {
  hostname: 'uinames.com',
  path: '/api/?amount=1',
  method: 'GET'
}

let users = {}
let usrArr = []

function getName (socket) {
  let name = ''
  const req = https.request(options, (res) => {
    res.on('data', (chunk) => {
      name += chunk
    })
    res.on('end', () => {
      name = JSON.parse(name).name
      users[socket.id] = name
      usrArr.push(name)
      console.log(users)
      socket.broadcast.emit('users', usrArr)
      socket.emit('myName', name)
      socket.emit('users', usrArr)
    })
  })

  req.end()
}

function listener (socket) {
  socket.on('disconnect', () => { handleDisconn(socket) })
}

function handleDisconn (socket) {
  delete users[socket.id]
  socket.broadcast.emit('disconnUser', socket.id)
  console.log(users)
}

function handleConnection (socket) {
  getName(socket)
  listener(socket)
}

module.exports = { handleConnection }
