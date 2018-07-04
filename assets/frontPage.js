let nameDiv = newElement('div', {'id': 'nameDiv'})
let usersDiv = newElement('div', {'id': 'usersDiv'})
let msgDiv = newElement('div', {'id': 'msgDiv'})
let tBox = newElement('input', {'id': 'tBox'})
let sendBtn = newElement('button', {'id': 'sendBtn'}, 'send')
appChildren ({body: [body, nameDiv, usersDiv, msgDiv]})
appChildren({msgDiv: [msgDiv, tBox, sendBtn]})
addListener({sendBtn: [sendBtn, 'click', sendMsg]})

let users = []
let recvrName = ''

socket.on('myName', displayName)
socket.on('user', addToUsers)
socket.on('disconnUser', removeUser)
socket.on('message', popMsg)
socket.on('chats', (msg) => { console.log(msg) })

function popMsg (msg) {
  console.log(msg)
}

function sendMsg () {
  let name = recvrName
  let msg = `${new Date().toString().slice(16, 24)} ${tBox.value}`
  socket.send([name, msg])
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
