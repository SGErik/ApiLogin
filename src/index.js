const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const app = express()

require('./database')

app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    limits: {fileSize: 50 * 2024 * 1024}
}));

app.use(cors())

app.use(express.json())

app.use(routes)


app.listen(3030 , () => {
    console.log('Server Rodando')
})
