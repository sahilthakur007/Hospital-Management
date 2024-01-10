const User = require("../Models/User.js")
const Doctor = require("../Models/Doctor.js")
const Hospital = require("../Models/Hospital.js")
const jwt = require("jsonwebtoken")
exports.isauthenticatedUser = async (req, res, next) => {
    try {

        var token = req.headers.authorization
        if (token == undefined) {
            return res.status(401).json({
                message: "Your are not authenticated",
                success: false
            })
        }
        var client = undefined;

        var tokenverification = jwt.verify(token, "Hospital Managment")
        id = tokenverification.id
        client = await User.findOne({ _id: id })

        if (client != undefined) {
            req.body.client = client
        }
        else {
            throw new Error("Your are not authorized")
        }
        next()
    }
    catch (e) {
        return res.status(401).json({
            message: "Your are not authenticated",
            success: true
        })
    }
}

exports.isauthenticatedDoctor = async (req, res, next) => {
    try {

        var token = req.headers.authorization
        if (token == undefined) {
            return res.status(401).json({
                message: "Your are not authenticated",
                success: false
            })
        }
        var client = undefined;

        var tokenverification = jwt.verify(token, "Hospital Managment")
        id = tokenverification.id

        client = await Doctor.findOne({ _id: id })

        if (client != undefined) {
            req.body.client = client
        }
        else {
            throw new Error("Your are not authorized")
        }
        next()
    }
    catch (e) {
        return res.status(401).json({
            message: "Your are not authenticated",
            success: true
        })
    }
}

exports.isauthenticatedHospital = async (req, res, next) => {
    try {

        var token = req.headers.authorization
        if (token == undefined) {
            return res.status(401).json({
                message: "Your are not authenticated",
                success: false
            })
        }
        var client = undefined;

        var tokenverification = jwt.verify(token, "Hospital Managment")
        id = tokenverification.id
        client = await Hospital.findOne({ _id: id })
        if (client != undefined) {
            req.body.client = client
        }
        else {
            throw new Error("Your are not authorized")
        }
        next()
    }
    catch (e) {
        return res.status(401).json({
            message: "Your are not authenticated",
            success: true
        })
    }
}