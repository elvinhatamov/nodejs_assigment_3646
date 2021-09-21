const fs = require('fs')

const requestHandler = (req, res) => {
  const url = req.url
  const method = req.method
  if (url === '/') {
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write(
      '<body><form action = "/message" method ="POST"><input type= "text" name="message"><button type ="submit">Send</button></form></body>'
    )
    res.write('</html>')
    return res.end()
  }
  if (url === '/message' && method === 'POST') {
    const body = []
    req.on('data', (chunk) => {
      console.log(chunk)
      body.push(chunk)
    }) //listen data event
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString() // utility method ofefred by Node Js
      const message = parseBody.split('=')[1]
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302
        res.writeHead('Location', '/')
        return res.end()
      })
    })
  }

  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head><title>My First Page</title></head>')
  res.write('<body><h1>My First Page</h1></body>')
  res.write('</html>')
  res.end()
}

//global objects exports by Node
module.exports = requestHandler
