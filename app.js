const hhtp = require('http')

const routes = require('./routes') //custome file

const server = hhtp.createServer(routes)

server.listen(3000)
