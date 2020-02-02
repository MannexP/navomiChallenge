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