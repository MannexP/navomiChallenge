const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Movie = require('../../models/Movie')
const User = require('../../models/User')


router.get('/', auth, async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
        res.status(550).send('Server Error')
    }
});

module.exports = router;