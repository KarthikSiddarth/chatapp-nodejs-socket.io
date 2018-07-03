socket.on('name', displayName)

function displayName (name) {
  let nameEle = newElement('p', {'id': 'name'}, name)
  appChildren ({body: [body, nameEle]})
}
