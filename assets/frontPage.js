let chatWindow = newElement('div', {'id': 'chatWindow'})
appChildren({body: [body, chatWindow]})

function displayName (name) {
  let nameEle = newElement('p', {'id': name}, name)
  appChildren ({chatWindow: [chatWindow, nameEle]})
}

socket.on('myName', displayName)

socket.on('users', (user) => {
  console.log(user)
})
