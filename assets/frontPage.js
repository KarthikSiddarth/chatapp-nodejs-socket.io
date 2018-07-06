let nameDiv = newElement('div', {'id': 'nameDiv'})
let usersDiv = newElement('div', {'id': 'usersDiv'})
let msgDiv = newElement('div', {'id': 'msgDiv'})
let chatDiv = newElement('div', {'id': 'chatDiv'})
let usrTitleBar = newElement('p', {'class': 'user titleBar'}, 'users online')
let tBox = newElement('input', {'id': 'tBox', 'placeholder': 'Enter your message'})
let sendBtn = newElement('button', {'id': 'sendBtn'}, 'send')

appChildren ({body: [body, nameDiv, usersDiv, chatDiv, msgDiv]})
appChildren({usersDiv: [usersDiv, usrTitleBar]})
appChildren({msgDiv: [msgDiv, tBox, sendBtn]})
addListener({sendBtn: [sendBtn, 'click', composeMsg]})

let users = []
let recvrName = ''
let activeEle = body

socket.on('myName', displayName)
socket.on('user', addToUsers)
socket.on('disconnUser', removeUser)
socket.on('message', populateMsg)
socket.on('chats', populateChat)

function populateMsg (msg) {
  if (recvrName === msg[0]) {
    let chatMsg = newElement('p', {'class': 'chats'}, `${msg[0]}: ${msg[1]}`)
    appChildren({chatDiv: [chatDiv, chatMsg]})
    chatMsg.classList.add('received')
  }
}

function populateChat (msg) {
  removeChildren(chatDiv)
  let chatArr = msg.split('\n')
  for (let i of chatArr) {
    if (i === '') { continue }
    let chatMsg = newElement('p', {'class': 'chats'}, i)
    appChildren({chatDiv: [chatDiv, chatMsg]})
    if (i.slice(0, 5) !== socket.id.slice(0, 5)) {
      chatMsg.classList.add('received')
    }
  }
}

function composeMsg () {
  let name = recvrName
  let msg = `${new Date().toString().slice(16, 24)}: ${tBox.value}`
  sendMsg(name, msg)
  tBox.value = ''
  if (activeEle === body) { return }
  let chatMsg = newElement('p', {'class': 'chats'}, `${socket.id.slice(0, 5)}: ${msg}`)
  appChildren({chatDiv: [chatDiv, chatMsg]})
}

function sendMsg (name, msg) {
  socket.send([name, msg])
}

function displayName (name) {
  let nameEle = newElement('p', {'id': name, 'class': 'userName'}, `Your name is ${name}`)
  appChildren ({nameDiv: [nameDiv, nameEle]})
}

function addToUsers (user) {
  if (user === socket.id.slice(0, 5)) { return }
  users.push(user)
  let usrName = newElement('p', {'id': user, 'class': 'user'}, user)
  appChildren({usersDiv: [usersDiv, usrName]})
  addListener({usrName: [usrName, 'click', () => { getRecvrName(usrName) }]})
}

function getRecvrName (usrName) {
  activeEle.classList.remove('on')
  usrName.classList.add('on')
  activeEle = usrName
  recvrName = usrName.textContent
  socket.emit('retrieveChat', recvrName)
}


function removeUser (user) {
  users.splice(users.indexOf(user), 1)
  removeChild([usersDiv, user])
}
