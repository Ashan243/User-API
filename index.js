
const express = require("express")
const app = express()
const winston = require("winston")
require("./Startup/loggers")
// require("./Startup/logger")()

require("./Startup/logger")
require("./Startup/routes")(app) //Starting up API Routes
require("./Startup/database")() //Starting MongoDB connection via mongoose
// require("./Startup/config")()  //Privatekey logic 

const RoutesAPILogger = winston.loggers.get("API Calls")
const DatabaseLogger = winston.loggers.get("Database")
const ProductLogger = winston.loggers.get("Product API")

RoutesAPILogger.info("API call being loaded")
DatabaseLogger.info("Call from database sucessfull")
ProductLogger.info("Product Found")

// // winstonTest.otherMain("error")
// if(config.get("environment") === "development"){
//     const portDebug = require("debug")("portDebug")
// }

const port = process.env.PORT || 4001
const mainServer = app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = mainServer

