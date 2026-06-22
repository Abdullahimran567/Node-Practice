const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(cors({origin: "http://localhost:3000" , credentials : true}))
app.use(express.json())

app.use(cookieParser())

app.use(require('./src/routes/index'))





module.exports = app