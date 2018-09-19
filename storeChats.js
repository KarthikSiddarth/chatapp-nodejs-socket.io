const fs = require('fs')

fs.mkdirSync('./chats')

function writeChat (path, msg) {
  fs.appendFile(`./chats/${path}.txt`, `${msg}\n`, (err) => { if (err) { console.log(err) } })
}

function checkFile (path) {
  try {
    fs.openSync(`./chats/${path}.txt`, 'r')
    return 1
  } catch (err) {
    return 0
  }
}

function getChat (recvrName, socket) {
  let path1 = socket.id.slice(0, 5)
  let path2 = recvrName
  let path = `${path1}?${path2}`
  if (checkFile(path)) {
    fs.createReadStream(`./chats/${path}.txt`).on('data', (chunk) => {
      socket.emit('chats', chunk.toString())
    })
  } else {
    path = `${path2}?${path1}`
    if (checkFile(path)) {
      fs.createReadStream(`./chats/${path}.txt`).on('data', (chunk) => {
        socket.emit('chats', chunk.toString())
      })
    } else {
      socket.emit('chats', '')
    }
  }
}

module.exports = { writeChat, checkFile, getChat }
