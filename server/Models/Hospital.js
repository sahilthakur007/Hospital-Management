const mongoose = require("mongoose")

const Hospital = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
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
    contact: {
        type: String,
        required: true,
    },
    Doctors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor"
        }
    ]


})

module.exports = mongoose.model("Hospital", Hospital); 