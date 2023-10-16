const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  email: String,
  password: String,
  money: Number,
});

const UserModel = mongoose.model('User', usersSchema);

module.exports = UserModel;