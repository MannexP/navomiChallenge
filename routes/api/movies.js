const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult } = require('express-validator');

const Movie = require('../../models/Movie')
const User = require('../../models/User')


router.post(
    "/",
    [
      auth,
      [
        check("name", "Movie is Required")
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
      
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
     
        const user = await User.findById(req.user.id).select("-password");
  
      
        const newMovie = new Movie({
          name: req.body.name,
          user: req.user.id
        });
  
       
        const movie = await newMovie.save();
        res.json(movie);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  );

module.exports = router;