const express = require("express");
const { createUser, login, addPatient, getPatientListByUser, getSinglePatient, getPrescriptionByPatient } = require("../Controllers/User");
const { isauthenticatedUser } = require("../middleware/AuthMiddleware");
const Router = express.Router();

Router.route("/create").post(createUser);
Router.route("/login").post(login);
Router.route("/add-patient/:hospitalid").post(isauthenticatedUser, addPatient)
Router.route("/view-patient").get(isauthenticatedUser, getPatientListByUser)
Router.route("/view-patient/:patientid").get(isauthenticatedUser, getSinglePatient)
Router.route("/view-prescription/:patientid").get(isauthenticatedUser, getPrescriptionByPatient)
module.exports = Router