let users = []
let usrObj = {}

function listener (socket) {
  socket.on('disconnect', () => { handleDisconn(socket) })
  socket.on('message', (msg) => { handleMsg(socket, msg) })
}

function handleDisconn (socket) {
  let usr = socket.id.slice(0, 5)
  users.splice(users.indexOf(usr), 1)
  socket.broadcast.emit('disconnUser', socket.id.slice(0, 5))
}

function handleConnection (socket) {
  let name = socket.id.slice(0, 5)
  usrObj[name] = socket.id
  users.push(name)
  socket.broadcast.emit('user', name)
  emitUsers(users, socket)
  socket.emit('myName', name)
  listener(socket)
}

function emitUsers (users, socket) {
  for (let i of users) {
    socket.emit('user', i)
  }
}

function handleMsg (socket, msg) {
  socket.to(usrObj[msg[0]]).send(msg[1])
}

module.exports = { handleConnection }
