const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    district: { type: String, required: true },
    pincode: { type: Number, required: true },
    email: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model("Users" , UserSchema);

module.exports = User;