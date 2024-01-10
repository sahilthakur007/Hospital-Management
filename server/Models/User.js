const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {

        address1: {
            type: String,
            required: true
        },

        address2: String,

        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }

    },
    mobile: {
        type: String,
        length: 10
    },


})
module.exports = mongoose.model("User", User); 