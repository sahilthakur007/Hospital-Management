const User = require("../Models/User")
const Patient = require("../Models/Patient")
const Prescription = require("../Models/Prescription")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
exports.createUser = async (req, res) => {
    var { name, username, password, email, address, age, mobile } = req.body
    name = name.trim()
    username = username.trim()
    password = password.trim()
    email = email.trim()
    mobile = mobile.trim()

    var encryptedPassword = await bcrypt.hash(password, 10);

    if (!name || !username || !password || !email || !address || !age || !mobile) {
        return res.status(401).json({
            messege: "Some fields are missing try again",
            success: false
        })
    }

    try {

        const alreadyUser = await User.findOne({ username }, { _id: 1 })
        if (alreadyUser) {
            return res.status(400).json({
                messege: "User already exists",
                success: false
            })
        }

        const saveduser = await User.create({
            name, username, password: encryptedPassword, email, address, age, mobile
        })


        var token = jwt.sign({ username, id: saveduser._id }, "user",
            { expiresIn: "24h" })
        return res.status(200).json({
            saveduser,
            token,
            success: true
        })
        // var token = jwt.sign()
    }
    catch (e) {

        res.status(500).json({
            messege: "Something went wrong!!"
        })
    }
}

exports.login = async (req, res) => {
    var { username, password } = req.body
    username = username.trim()
    password = password.trim()
    if (!username || !password) {
        return res.status(400).json({
            message: "Some fileds are missing"
        })
    }
    try {
        const alreadyUser = await User.findOne({ username }, { address: 0 })
        if (!alreadyUser) {
            return res.status(400).json({
                message: "Wrong Username",
                success: false

            })
        }
        var ismatched = await bcrypt.compare(password, alreadyUser.password)
        if (!ismatched) {
            return res.status(400).json({
                message: "Wrong Password",
                success: false
            })
        }

        var token = jwt.sign({ id: alreadyUser._id, role: "User" }, "Hospital Managment", { expiresIn: "24h" })
        return res.status(200).json({
            alreadyUser,
            token,
            success: true
        })

    }
    catch (e) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }

}

// add patient
exports.addPatient = async (req, res) => {
    var { name, age, symptoms, description, diseaseDuration, } = req.body
    name = name?.trim()
    description = description?.trim()

    if (!name || !age || !symptoms || !description || !diseaseDuration) {
        return res.status(400).json({
            message: "Some fields are empty",
            success: false
        })
    }
    if (symptoms.length == 0) {
        return res.status(400).json({
            message: "Symptoms list cannot be empty",
            success: false
        })
    }
    try {
        var userId = req.body.client._id
        var hospitalId = req.params.hospitalid;
        // console.log(hospitalId)
        const savedpatient = await Patient.create({
            name, entryDate: new Date(), age, description, symptoms, diseaseDuration, userId, hospitalId
        })
        return res.status(200).json({
            savedpatient,
            success: true
        })
    }
    catch (e) {

        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }

}
// view list of patient by user 
exports.getPatientListByUser = async (req, res) => {
    var userId = req.body.client._id;
    try {
        const patients = await Patient.find({ userId })
        res.status(200).json({
            patients,
            success: true
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }

}

// view single patient by id
exports.getSinglePatient = async (req, res) => {
    var patientId = req.params.patientid;
    try {
        const patients = await Patient.findOne({ _id: patientId })
        res.status(200).json({
            patients,
            success: true
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }

}
// view prescription of patient by patient id 
exports.getPrescriptionByPatient = async (req, res) => {
    var patientId = req.params.patientid;
    try {
        const prescription = await Prescription.findOne({ patientId })
        res.status(200).json({
            prescription,
            success: true
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }

}

