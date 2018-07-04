let users = []

function listener (socket) {
  socket.on('disconnect', () => { handleDisconn(socket) })
  socket.on('message', () => { handleMsg(socket) })
}

function handleDisconn (socket) {
  let usr = socket.id.slice(0, 5)
  users.splice(users.indexOf(usr), 1)
  socket.broadcast.emit('disconnUser', socket.id.slice(0, 5))
}

function handleConnection (socket) {
  users.push(socket.id.slice(0, 5))
  socket.broadcast.emit('user', socket.id.slice(0, 5))
  socket.emit('myName', socket.id.slice(0, 5))
  socket.emit('users', users)
  listener(socket)
}

module.exports = { handleConnection }
