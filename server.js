const http = require('http').createServer()
const fs = require('fs').createReadStream
const io = require('socket.io')(http)
const handleConn = require('./socketManager.js').handleConnection

http.listen(2001, '0.0.0.0')

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
