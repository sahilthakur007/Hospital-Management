const express = require("express")
const { createHospital, deleteHospital, updateHospitalProfile, hospitalLogin, findHospitalByCity } = require("../Controllers/Hospital")
const { isauthenticatedHospital } = require("../middleware/AuthMiddleware")
const Router = express.Router()

Router.route("/create").post(createHospital)
Router.route("/login").get(hospitalLogin)
Router.route("/delete").delete(deleteHospital)
Router.route("/update").put(isauthenticatedHospital, updateHospitalProfile)
Router.route("/findHospitalByCity").get(findHospitalByCity)
Router.route("/findHospital").get(findHospitalByCity)

module.exports = Router 