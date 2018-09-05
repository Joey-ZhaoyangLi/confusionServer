const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const favoriteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish',
    unique: true
  }] 
})

var Favorites = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorites