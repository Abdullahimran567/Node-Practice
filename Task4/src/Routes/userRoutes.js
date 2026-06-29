const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')
const {postTask , viewTask , deleteTask , updateTask} = require('../Controllers/userController')

router.post('/addTask' , verifyToken , postTask)
router.get('/viewTask' , verifyToken , viewTask)
router.delete('/deleteTask', verifyToken , deleteTask )
router.patch('/updateTask' , verifyToken , updateTask)

module.exports = router