const express = require('express')
require('dotenv').config()
const connectDb = require('./src/Config/db')
const User = require('./src/models/User')
const cookieParser= require('cookie-parser')


connectDb();
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use(require('./src/Routes/index'))

 
module.exports = app