const { error } = require("console")
const mongoose = require("mongoose")

exports.connectDatabase = () => {
    let url = "mongodb+srv://sahil:sahil@cluster0.0lm2s.mongodb.net/HospitalManagmentSystem"
    mongoose.connect(url).then(console.log("Database connected succesfully")).catch((error) => {
        console.log(error)
    })
}