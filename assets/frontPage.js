let nameDiv = newElement('div', {'id': 'nameDiv'})
let usersDiv = newElement('div', {'id': 'usersDiv'})
let msgDiv = newElement('div', {'id': 'msgDiv'})
let chatDiv = newElement('div', {'id': 'chatDiv'})
let tBox = newElement('input', {'id': 'tBox'})
let sendBtn = newElement('button', {'id': 'sendBtn'}, 'send')
appChildren ({body: [body, nameDiv, chatDiv, usersDiv, msgDiv]})
appChildren({msgDiv: [msgDiv, tBox, sendBtn]})
addListener({sendBtn: [sendBtn, 'click', sendMsg]})

let users = []
let recvrName = ''

socket.on('myName', displayName)
socket.on('user', addToUsers)
socket.on('disconnUser', removeUser)
socket.on('message', popMsg)
socket.on('chats', popChat)

function popMsg (msg) {
  if (recvrName === msg[0]) {
  let chatMsg = newElement('p', {}, `${msg[0]}: ${msg[1]}`)
  appChildren({chatDiv: [chatDiv, chatMsg]})
  }
}

function popChat (msg) {
  removeChildren(chatDiv)
  let chatArr = msg.split('\n')
  for (let i of chatArr) {
    let chatMsg = newElement('p', {}, i)
    appChildren({chatDiv: [chatDiv, chatMsg]})
  }
}

function sendMsg () {
  let name = recvrName
  let msg = `${new Date().toString().slice(16, 24)} ${tBox.value}`
  socket.send([name, msg])
  let chatMsg = newElement('p', {}, msg)
  appChildren({chatDiv: [chatDiv, chatMsg]})
}

function displayName (name) {
  let nameEle = newElement('p', {'id': name}, name)
  appChildren ({nameDiv: [nameDiv, nameEle]})
}

function addToUsers (user) {
  users.push(user)
  let usrName = newElement('p', {'id': user}, user)
  appChildren({usersDiv: [usersDiv, usrName]})
  addListener({usrName: [usrName, 'click', () => {
    recvrName = usrName.textContent
    socket.emit('get', recvrName)
  }]
  })
}

function removeUser (user) {
  users.splice(users.indexOf(user), 1)
  removeChild([usersDiv, user])
}

function getChat () {
  socket.emit('get')
}
