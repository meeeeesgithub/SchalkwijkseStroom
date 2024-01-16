const express = require('express')
const app = express()
const port = 3000
const logger = require('morgan')

app.use(logger('dev'))
app.use(express.static('client'))


app.get('/', (req, res) => {
    console.log('/ is visted')
})

app.post('/email', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})