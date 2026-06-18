const express  = require( 'express')
const router = express.Router()
const {getusers , addUser , deluser , updateuser} = require('../controllers/userController.js')


router.get('/' , getusers)
router.get('/:id' , getusers)

router.post('/' , addUser)

router.delete('/:id' , deluser)
router.patch('/:id' , updateuser)
module.exports = router