const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    isActivated: {type: Boolean, required: false},
    type: {type: String, required: true},
    activationLink: {type: String, required: false},
});

module.exports = model('User', UserSchema);