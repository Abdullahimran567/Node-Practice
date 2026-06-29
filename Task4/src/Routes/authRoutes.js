const express = require('express')
const router = express.Router()
const generateToken = require('../Utils/token')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')


router.post('/Signup' , async (req ,res) => {
    try {
    const {name , password ,  role} = req.body

    if(!name || !role || !password) {
        return res.status(400).json({err : "Role or Name field missing"})
    }

    
    const existingUser = await User.findOne({name : name}) 

    if(existingUser) {
        return res.status(409).json({err : 'user with same name already exists'})
    }

    const hashpassword = await bcrypt.hash(password , 10)

    await User.create({name: name , password : hashpassword ,role : role});


    res.status(201).json({msg : 'User successfully created'})
} catch(e) {
    console.error('Eror while sigining up')
    res.status(500).json({err : "Something went wrong"})
}
})


router.post('/Login' , async (req ,res)=> {
    try {
    const {name ,password} = req.body

      if(!name || !password) {
        return res.status(400).json({err : "Role or Name field missing"})
    }

    const user = await User.findOne({name : name })

    if(!user) {
        return res.status(404).json({err : "User not found"})
    }

    const {_id , password : hashedpassword} = user

    if(! await bcrypt.compare(password , hashedpassword)) {
       return res.status(401).json({err : "Invalid password entered"})
    }

    const accessToken = await generateToken(_id)

    res.cookie('accessToken' , accessToken , {maxAge : 1000*60*60 , httpOnly : true , sameSite : 'strict'})
    res.status(200).json({msg : 'login successfull'})
}
catch (e) {
     console.error('Eror while Logging in  ')
    res.status(500).json({err : "Something went wrong"})
}
}
)

module.exports = router