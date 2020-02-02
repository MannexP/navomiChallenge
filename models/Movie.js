const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new mongoose.Schema({
user: {
    type: Schema.Types.ObjectId,
    ref:"user"
},
name: {
    type: String,
    required: true
},
rating: {
    type: Number
   
},
directors: {
    type: [String],
    required: true
},
release: {
    type: Date,
    require: true
},
description: {
    type: String
     
}
});

module.exports = Profile = mongoose.model('movie', MovieSchema);