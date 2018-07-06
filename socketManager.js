const { writeChat, checkFile, getChat } = require('./storeChats.js')

let users = []
let usrObj = {}

function listener (socket) {
  socket.on('disconnect', () => { handleDisconn(socket) })
  socket.on('message', (msg) => { handleMsg(socket, msg) })
  socket.on('retrieveChat', (recvrName) => { getChat(recvrName, socket) })
}

function handleDisconn (socket) {
  let usr = socket.id.slice(0, 5)
  users.splice(users.indexOf(usr), 1)
  socket.broadcast.emit('disconnUser', usr)
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
  let path1 = socket.id.slice(0, 5)
  let path2 = msg[0]
  let path = `${path1}?${path2}`
  if (checkFile(path)) {
    writeChat(path, `${path1}: ${msg[1]}`)
  } else {
    path = `${path2}?${path1}`
    writeChat(path, `${path1}: ${msg[1]}`)
  }
  socket.to(usrObj[path2]).send([path1, msg[1]])
}

module.exports = { handleConnection }
