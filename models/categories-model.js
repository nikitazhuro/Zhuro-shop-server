const { Schema, model } = require('mongoose');

const Categories = new Schema({
    men: [{type: String, required: true, unique: true}],
    women: [{type: String, required: true, unique: true}],
})
module.exports = model('Categories', Categories)