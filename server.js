const http = require('http').createServer()
const fs = require('fs').createReadStream
const io = require('socket.io')(http)
const handleConn = require('./socketManager.js').handleConnection

const port = process.env.PORT || 2001

http.listen(port)

http.on('request', handler)

function handler (req, res) {
  let path
  if (!(req.url.startsWith('/socket'))) {
    if (req.url === '/') {
      path = './index.html'
    } else if (req.url.startsWith('/assets')) {
      path = `.${req.url}`
    }
    try {
      fs(path).pipe(res)
    } catch (err) {
    }
  }
}

io.on('connection', (socket) => {
  handleConn(socket)
})
