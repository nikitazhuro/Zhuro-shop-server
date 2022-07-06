const { Schema, model } = require('mongoose');

const Good = new Schema({
    category: {type: String, required: true},
    title: {type: String, required: true},
    discription: {type: String, required: true},
    sizes: [[{type: String, required: true}]],
    colors: [{type: String, required: true}],
    sex: {type: String, required:true},
    prices: [{type: String, required: true}],
    img: []
})
module.exports = model('Good', Good)