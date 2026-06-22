const express  = require( 'express')
const router = express.Router()
const {getusers , addUser , deluser , updateuser} = require('../controllers/userController.js')
const validateToken = require('../middleware/auth.js')


router.get('/' , validateToken , getusers)
router.get('/:id' ,validateToken , getusers)

router.post('/' ,validateToken , addUser)

router.delete('/:id' ,validateToken, deluser)
router.patch('/:id' ,validateToken, updateuser)
module.exports = router