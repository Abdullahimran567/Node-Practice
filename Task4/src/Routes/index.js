const express = require('express')

const router = express.Router()

router.get('/' , (req ,res)=> {
    res.json({msg : 'WELCOME TO MY APP'})
})

router.use(require('./authRoutes'))
router.use('/user' , require('./userRoutes'));

module.exports = router