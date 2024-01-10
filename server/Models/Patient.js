const mongoose = require("mongoose")
const Patient = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    entryDate: {
        type: Date,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    description: {
        type: String,
    },
    symptoms: [
        {
            type: String,
            required: true
        }
    ]
    ,
    diseaseDuration: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    prescriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription"
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },
    status: {
        type: String,
        default: "NOT TREATED",
    }


})

module.exports = mongoose.model("Patient", Patient)