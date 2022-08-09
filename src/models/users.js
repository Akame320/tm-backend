const { Schema, model } = require('mongoose')

const User = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
})

module.exports = model('User', User)