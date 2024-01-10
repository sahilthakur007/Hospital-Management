// add hospital
const express = require("express")
const Hospital = require("../Models/Hospital")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { duplicateKeyError } = require("../Helper/ErrorHandling.js")
exports.createHospital = async (req, res) => {
    var { name, email, password, contact, address } = req.body
    name = name.trim()
    email = email.trim()
    password = password.trim()
    contact = contact.trim()
    if (!name || !email || !password || !contact || !address) {
        return res.status(400).json({
            message: "Some fields are missing",
            success: false
        })
    }



    try {
        var encryptedPassword = await bcrypt.hash(password, 10)
        var alreadyHospital = await Hospital.findOne({ email }, { _id: 1 })
        if (alreadyHospital) {
            return res.status(400).json({
                message: "Hospital is already register with this email",
                success: false
            })
        }
        address.city = address.city.toLowerCase()
        var savedhospital = await Hospital.create({
            name, email, password: encryptedPassword, contact, address
        })

        var token = jwt.sign({ id: savedhospital._id, role: "Hospital" }, "Hospital Managment", { expiresIn: "24h" })

        return res.status(200).json({
            token,
            savedhospital,
            success: true
        })

    }
    catch (e) {
        if (e.code == 11000) {
            return duplicateKeyError(e, res)
        }

        return res.status(500).json({
            e,
            message: "Something went wrong",
            success: false
        })
    }

}

exports.hospitalLogin = async (req, res) => {
    var { username, password } = req.body
    username = username.trim()
    password = password.trim()
    if (!username || !password) {
        return res.status(400).json({
            message: "Some fileds are missing"
        })
    }
    try {
        const alreadyHospital = await Hospital.findOne({ email: username }, { address: 0 })
        if (!alreadyHospital) {
            return res.status(401).json({
                message: "Wrong Username",
                success: false

            })
        }
        var ismatched = await bcrypt.compare(password, alreadyHospital.password)
        if (!ismatched) {
            return res.status(401).json({
                message: "Wrong Password",
                success: false
            })
        }

        var token = jwt.sign({ id: alreadyHospital._id, role: "Hospital" }, "Hospital Managment", { expiresIn: "24h" })
        return res.status(200).json({
            alreadyHospital,
            token,
            success: true
        })

    }
    catch (e) {
        return res.status(500).json({
            e,
            message: "Something went wrong",
            success: false
        })
    }

}
// remove hospital

exports.deleteHospital = async (req, res) => {

    var id = req.query.id
    if (!id) {
        return res.status(401).json({
            message: "Some query parameters are missing",
            success: false
        })
    }
    try {
        await Hospital.deleteOne({ _id: id });
        return res.status(200).json({
            message: "Hospital deleted succesfully",
            success: true
        })

    }
    catch (e) {
        return res.status(500).json({
            message: "Something  went wrong",
            success: false
        })
    }
}


// update hospital
exports.updateHospitalProfile = async (req, res) => {
    var { name, email, contact, address } = req.body
    name = name.trim()
    email = email.trim()
    contact = contact.trim()
    var hospitalid = req.body.client._id
    if (!name || !email || !contact || !address) {
        return res.status(400).json({
            message: "Some fields are missing",
            success: false
        })
    }

    try {

        await Hospital.updateOne({ _id: hospitalid }, {
            $set: {
                name, email, contact, address
            }
        })
        return res.status(200).json({
            message: "Hospital details updated  succesfully",
            success: true
        })


    }
    catch (e) {
        if (e.code == 11000) {
            duplicateKeyError(e, res)
        }
        return res.status(500).json({
            message: "Something  went wrong",
            success: false
        })
    }

}
// find hospital by city
exports.findHospitalByCity = async (req, res) => {
    var city = req.query.city

    try {
        var hospitals
        if (city) {
            city = city.toLowerCase()
            hospitals = await Hospital.find({ "address.city": city })

        }
        else {
            hospitals = await Hospital.find()
        }
        return res.status(500).json({
            hospitals,
            success: true
        })
    }
    catch (e) {
        return res.status(500).json({
            message: "Something  went wrong",
            success: false
        })
    }
}
