const mongoose = require("mongoose")
const config = require("config")
const winston = require("winston")

module.exports = function(){
    const dbconnection = config.get("dbconnection")    
mongoose.connect(dbconnection, {useUnifiedTopology: true})
.then(() => console.log("Connected to MongoDB"))
//
.catch(err => console.log(`Error: ${err}`))}