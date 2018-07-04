let nameDiv = newElement('div', {'id': 'nameDiv'})
let usersDiv = newElement('div', {'id': 'usersDiv'})
let msgDiv = newElement('div', {'id': 'msgDiv'})
let rname = newElement('input', {'id': 'rname'})
let tBox = newElement('input', {'id': 'tBox'})
let sendBtn = newElement('button', {'id': 'sendBtn'}, 'send')
appChildren ({body: [body, nameDiv, usersDiv, msgDiv]})
appChildren({msgDiv: [msgDiv, rname, tBox, sendBtn]})
addListener({sendBtn: [sendBtn, 'click', sendMsg]})

let users = []

socket.on('myName', displayName)
socket.on('users', displayUsers)
socket.on('user', addToUsers)
socket.on('disconnUser', removeUser)

function sendMsg () {
  let name = rname.value
  let msg = tBox.value
  socket.send([name, msg])
}

function displayName (name) {
  let nameEle = newElement('p', {'id': name}, name)
  appChildren ({nameDiv: [nameDiv, nameEle]})
}

function displayUsers (usrArr) {
  let usrName
  users = usrArr
  for (let i of users) {
    usrName = newElement('p', {'id': i}, i)
    appChildren({usersDiv: [usersDiv, usrName]})
  }
}

function addToUsers (user) {
  users.push(user)
  let usrName = newElement('p', {'id': user}, user)
  appChildren({usersDiv: [usersDiv, usrName]})
}

function removeUser (user) {
  users.splice(users.indexOf(user), 1)
  removeChild([usersDiv, user])
}
