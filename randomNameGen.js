const https = require('https')

const options = {
  hostname: 'uinames.com',
  path: '/api/?amount=1&region=germany',
  method: 'GET'
}

let name = ''
const req = https.request(options, (res) => {
  res.on('data', (chunk) => {
    name += chunk
  })
  res.on('end', () => {
    exports.name = JSON.parse(name).name
  })
})

req.end()
