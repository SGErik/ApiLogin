const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()

require('./database')

app.use(cors())

app.use(express.json())

app.use(routes)


app.listen(3030, '0.0.0.0' , () => {
    console.log('Server Rodando')
})
