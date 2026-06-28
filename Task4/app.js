const express = require('express')
require('dotenv').config()
const connectDb = require('./src/Config/db')



connectDb();
const app = express()

app.use(express.json())

app.use(require('./src/Routes/index'))


module.exports = app