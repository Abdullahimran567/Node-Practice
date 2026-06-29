const jwt = require('jsonwebtoken')


async function verifyToken(req , res , next) {
    const accessToken = req.cookies?.accessToken

      if (!accessToken) {
        console.log('JWT Error')
        return res.status(403).json({ err: "Jwt error" })
    }

    jwt.verify(accessToken , process.env.JWT_SECRET_KEY , (err , decoded)=> {
        if(err) {
         return   res.status(403).json({err : "Invalid token"})
        }

        req.userId = decoded.id
        next();
    })
}

module.exports = verifyToken