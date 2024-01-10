const express = require("express")
const { addDoctor, doctorLogin, removeDoctor, updateDoctor, getDoctorBySpetilization, getDoctorByHospital, getAllDoctor, getListOfPatientForDoctor, getSinglePatientForDoctor, savePrescription } = require("../Controllers/Doctor")
const { isauthenticatedHospital, isauthenticatedDoctor } = require("../middleware/AuthMiddleware")
const Router = express.Router()
Router.route("/create").post(isauthenticatedHospital, addDoctor)
Router.route("/login").post(doctorLogin)
Router.route("/delete").delete(removeDoctor)
Router.route('/update').put(isauthenticatedDoctor, updateDoctor)
Router.route('/spetilization').get(getDoctorBySpetilization)
Router.route('/hospital').get(isauthenticatedHospital, getDoctorByHospital)
Router.route('').get(getAllDoctor)
Router.route("/getpatientbyhospital").get(isauthenticatedDoctor, getListOfPatientForDoctor)
Router.route("/single-patient/:patientid").get(isauthenticatedDoctor, getSinglePatientForDoctor)
Router.route("/save-prescription/:patientid").get(isauthenticatedDoctor, savePrescription)

module.exports = Router  