const http = require('http').createServer()
const fs = require('fs').createReadStream
// require('./db.js')

let port = 2001

http.listen(port)

http.listening ? http.on('request', handleRequest) : console.log(`server is not listening on port ${port}`)

function handleRequest (req, res) {
  if (req.url === '/')	{
    path = './index.html'
  } else if (req.url.startsWith('/assets')) {
    path = `.${req.url}`
  }
  fs(path).pipe(res)
}
