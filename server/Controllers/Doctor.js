const Doctor = require("../Models/Doctor.js")
const Patient = require("../Models/Patient.js")
const { duplicateKeyError } = require("../Helper/ErrorHandling.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Hospital = require("../Models/Hospital.js")
const Prescription = require("../Models/Prescription.js")
// add doctor
exports.addDoctor = async (req, res) => {
    const hospitalId = req.body.client._id;
    var { name, email, password, mobile, spetilization, experience } = req.body
    name = name.trim()
    email = email.trim()
    password = password.trim()
    mobile = mobile.trim()
    spetilization = spetilization.trim()
    if (!name || !email || !password || !mobile || !spetilization || !experience) {
        return res.status(400).json({
            message: "Some fields are missing",
            success: false
        })
    }
    var encryptedPassword = await bcrypt.hash(password, 10);
    try {
        if (!hospitalId) {
            return res.status(401).json({
                message: "You are not authorized to performed this action",
                success: true

            })
        }
        var savedDoctor = await Doctor.create({
            name, email, password: encryptedPassword, mobile, spetilization, experience, hospital: hospitalId
        })
        return res.status(200).json({
            savedDoctor,
            success: true

        })

    }
    catch (e) {
        if (e.code == 11000) {
            return duplicateKeyError(e, res)
        }
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }


}
// login doctor
exports.doctorLogin = async (req, res) => {
    var { username, password } = req.body
    username = username.trim()
    password = password.trim()
    if (!username || !password) {
        return res.status(400).json({
            message: "Some fields are missing",
            success: false
        })
    }
    try {
        const alreadydoctor = await Doctor.findOne({ email: username })
        if (!alreadydoctor) {
            return res.status(401).json({
                message: "Wrong Username",
                success: false

            })
        }
        var ismatched = await bcrypt.compare(password, alreadydoctor.password)
        if (!ismatched) {
            return res.status(401).json({
                message: "Wrong Password",
                success: false
            })
        }

        var token = jwt.sign({ id: alreadydoctor._id, role: "Doctor" }, "Hospital Managment", { expiresIn: "24h" })
        return res.status(200).json({
            alreadydoctor,
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

// remove doctor
exports.removeDoctor = async (req, res) => {
    var doctorID = req.query.doctorid
    if (!doctorID) {
        return res.status(400).json({
            message: "Please specify doctor delete",
            success: false
        })
    }
    try {
        await Doctor.deleteOne({ _id: doctorID })

        return res.status(200).json({
            message: "Doctor removed succesfully",
            success: false
        })
    }
    catch (e) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}
// update doctor
exports.updateDoctor = async (req, res) => {
    var { name, email, mobile, spetilization, experience } = req.body
    var doctorID = req.body.client._id;
    try {
        var doctor = await Doctor.updateOne({ _id: doctorID }, {
            $set: {
                name, email, mobile, spetilization, experience
            }
        })

        return res.status(200).json({
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
// migrate hospital to other
exports.migrateDoctor = async (req, res) => {
    var migrateHospitalId = req.param.migratehospitalid
    var doctorId = req.query.doctorid
    try {
        if (!migrateHospitalId) {
            return res.status(400).json({
                message: "Please specify hospital to migrate",
                success: false
            })
        }
        if (!doctorId) {
            return res.status(400).json({
                message: "Please specify doctor ID to migrate",
                success: false
            })
        }

        await Doctor.updateOne({ _id: doctorId }, {
            $set: {
                doctor: migrateHospitalId
            }
        })

        return res.status(200).json({
            message: "Record updated succesfully",
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
// get all doctor by spetilization
exports.getDoctorBySpetilization = async (req, res) => {
    var spetilization = req.query.spetilization
    try {

        if (!spetilization) {
            return res.status(400).json({
                message: "Please specify specilization of doctor",
                success: false
            })
        }
        var Doctors = await Doctor.find({ spetilization })
        return res.status(200).json({
            Doctors,
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
// get all doctor by hospital
exports.getDoctorByHospital = async (req, res) => {
    var hospital = req.body.client._id
    try {

        if (!hospital) {
            return res.status(400).json({
                message: "Please specify hospital of doctors",
                success: false
            })
        }
        var Doctors = await Doctor.find({ hospital })
        return res.status(200).json({
            Doctors,
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

// get all doctor
exports.getAllDoctor = async (req, res) => {
    try {


        var Doctors = await Doctor.find()
        return res.status(200).json({
            Doctors,
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
// view list of not treated student for his hospital
exports.getListOfPatientForDoctor = async (req, res) => {

    try {
        var hospital = req.body.client.hospital
        const patients = await Patient.find({ hospital, status: "NOT TREATED" })

        return res.status(200).json({
            patients,
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
exports.getSinglePatientForDoctor = async (req, res) => {
    var patientId = req.params.patientid;
    try {
        const patient = await Patient.findOne({ _id: patientId })
        res.status(200).json({
            patient,
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

// generate and save prescription 
exports.savePrescription = async (req, res) => {
    var { patientname, diseasename, description, medicine } = req.body
    patientname = patientname?.trim()
    diseasename = diseasename?.trim()
    description = description?.trim()
    var treatedBy = req.body.client._id
    var patientId = req.params.patientid
    if (!patientname || !diseasename || !description || !medicine) {
        return res.status(400).json({
            message: "Some fields are missing",
            success: true
        })
    }
    try {
        const savedPrescription = await Prescription.create({
            patientname, description, diseasename, medicine, treatedBy, patientId, entryDate: new Date(), medicine
        })
        return res.status(200).json({
            savedPrescription,
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