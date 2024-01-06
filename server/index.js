const express = require('express')
const cors = require('cors')
const events = require('events')
const PORT = 5000
const app = express()
const emitter = new events.EventEmitter()
app.use(cors())
app.use(express.json())
app.post('/new-message', (req, res) => {
    const data = req.body
    emitter.emit('message', data)
    res.status(200)
    res.end()
})
app.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    })
    emitter.on('message', (message) => {
        res.write(`data: ${JSON.stringify(message)} \n\n`)
    })
})
app.listen(PORT, () => {console.log(`${PORT}`)})