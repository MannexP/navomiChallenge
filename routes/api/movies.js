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

router.get('/', auth, async (req, res) =>{
  try {
    const movies = await Movie.find().sort({ date: -1 });
    res.json(movies);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get('/:id', auth, async (req, res) =>{
  try {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
      return res.status(404).json({ msg: 'Movie not found'})
    }
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'Movie not found'})
    }
    res.status(500).send("Server Error");
  }
});

router.delete('/:id', auth, async (req, res) =>{
  try {
    const movie = await Movie.findById(req.params.id);

    if(!movie){
      return res.status(404).json({ msg: 'Movie not found'})
    }

    // Check User
    if(movie.user.toString() !== req.user.id) {
      return res.status(401).json ({ msg: 'User not authorized'})
    }

    await movie.remove();

    res.json({ msg: 'Movie deleted'});
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'Movie not found'})
    }
    res.status(500).send("Server Error");
  }
});








module.exports = router;