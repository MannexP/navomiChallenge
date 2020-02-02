const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
},
name: {
    type: String,
    required: true
},
rating: {
    type: Number,
    required: true
},
directors: {
    type: [String],
    required: true
},
release: {
    type: Date,
    require: true
},
snippet: {
    type: String,
    required: true   
}
});

module.exports = Profile = mongoose.model('movie', MovieSchema);