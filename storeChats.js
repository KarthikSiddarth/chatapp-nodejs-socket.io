const fs = require('fs')

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
    console.log('its here 1')
  } else {
    path = `${path2}?${path1}`
    if (checkFile(path)) {
      console.log('its here 2')
    } else {
      console.log('its no where')
    }
  }
}

module.exports = { writeChat, checkFile, getChat }
