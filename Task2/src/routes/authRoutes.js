const express = require('express');
const { generateAccessToken, generateRefreshToken } = require('../utils/token.js');

const router = express.Router();

router.get('/login', async (req, res) => {
    const user = { id: 1, name: "Abdullah" };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('accessToken', accessToken, {
        maxAge: 60 * 60 * 1000, 
        sameSite: 'lax',
        httpOnly: true
    });

    res.cookie('refreshToken', refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        sameSite: 'lax',
        httpOnly: true
    });

    return res.status(200).json({ msg: "Login successful" });
});

module.exports = router;