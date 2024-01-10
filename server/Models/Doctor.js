const mongoose = require("mongoose")
const Doctor = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,

    },
    spetilization: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    }

})

module.exports = mongoose.model("Doctor", Doctor); 