const { Schema, model } = require('mongoose');

const Basket = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    good: [{type: Schema.Types.ObjectId, ref: 'Good'}],
    activeColors: [{type: String, required: true}],
    activeSizes: [{type: String, required: true}],
    activePrices: [{type: String, required: true}]
})
module.exports = model('Basket', Basket)