const jwt  = require('jsonwebtoken')


async function validateToken(req, res , next){
    const { accessToken} = req.cookies;


    if(!accessToken) {
       return res.status(403).json({err : "Dont have token"})
    }

    jwt.verify(accessToken , process.env.JWT_SECRET , (err ,decoded)=> {
        if(err) return res.status(403).json({err : "Invalid token"})


            req.user = decoded


            next();



    })


}

module.exports = validateToken