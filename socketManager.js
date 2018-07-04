const store = require('./storeChats.js')
const write = store.writeChat
const check = store.checkFile
const getChat = store.getChat

let users = []
let usrObj = {}

function listener (socket) {
  socket.on('disconnect', () => { handleDisconn(socket) })
  socket.on('message', (msg) => { handleMsg(socket, msg) })
  socket.on('get', (recvrName) => { getChat(recvrName, socket) })
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
  let path1 = socket.id.slice(0, 5)
  let path2 = msg[0]
  let path = `${path1}?${path2}`
  if (check(path)) {
    write(path, msg[1])
  } else {
    path = `${path2}?${path1}`
    write(path, msg[1])
  }
}

module.exports = { handleConnection }
