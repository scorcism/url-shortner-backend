const mongoose = require('mongoose');

const { Schema } = mongoose;


const UrlSchema = new Schema({
    url: {
        type: String,
        unique: true,
    },
    short: {
        type: String,
        unique: true,
    }
}, {
    timestamps: true
})

const Url = mongoose.model('Url', UrlSchema);
module.exports = Url;