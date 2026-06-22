const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(
        { id: user.id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '10m' }
    );
}

function generateRefreshToken(user) {
    return jwt.sign(
        { id: user.id },
        process.env.REFRESH_SECRET,
        { expiresIn: '7d' }
    );
}

module.exports = { generateAccessToken, generateRefreshToken };