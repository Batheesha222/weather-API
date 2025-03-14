const mongoose = require("mongoose")
const {connectionUrl} = require("../config/keys")

const connectMongodb = async ()=>{
    try {
        await mongoose.connect(connectionUrl)
        console.log("database connection is successful")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectMongodb;