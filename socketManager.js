const https = require('https')

const options = {
  hostname: 'uinames.com',
  path: '/api/?amount=1&region=germany',
  method: 'GET'
}

function getName (socket) {
  let name = ''
  const req = https.request(options, (res) => {
    res.on('data', (chunk) => {
      name += chunk
    })
    res.on('end', () => {
      name = JSON.parse(name).name
      socket.emit('name', name)
    })
  })

  req.end()
}

function handleConnection (socket) {
  getName(socket)
}

module.exports = { handleConnection }
