const jwt = require('jsonwebtoken')

async function generateToken(userID) {
    
    const accessToken =  jwt.sign({id : userID} , process.env.JWT_SECRET_KEY , {expiresIn : process.env.JWT_EXPIRES_IN});
    return accessToken
}



module.exports = generateToken