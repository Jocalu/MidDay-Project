const { Schema, model } = require('mongoose');
const md5 = require('md5');

const restaurantSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  name: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  capacity: Number,
  phone: Number,
  street: String,
  number: Number,
  city: String,
  zipcode: String,
  image: String,
  menuprice: Number,
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  menus: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
  dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
});

restaurantSchema.methods.validPassword = function validPassword(pwd) {
  return this.password === md5(pwd);
};

module.exports = model('Restaurant', restaurantSchema);
