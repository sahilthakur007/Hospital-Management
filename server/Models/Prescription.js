const mongoose = require("mongoose")

const Prescription = new mongoose.Schema({
    patientname: {
        type: String,
        required: true
    },
    diseasename: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    entryDate: {
        type: Date,
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    treatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    medicine: [
        {
            medicineName: {
                type: String,
                required: true
            },
            morningDose: {
                type: Number,
                required: true
            },
            afternoonDose: {
                type: Number,
                required: true
            },
            eveningDose: {
                type: Number,
                required: true
            },
            totalQuantity: {
                type: Number,
                required: true
            }

        }
    ]


})

module.exports = mongoose.model("Prescription", Prescription)
