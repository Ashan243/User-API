const winston = require("winston")
// require("winston-mongodb")
require("./loggers")
const {combine, timestamp, printf, prettyPrint, json} = winston.format

const RoutesAPILogger = winston.loggers.get("API Calls")
const DatabaseLogger = winston.loggers.get("Database")
const ProductLogger = winston.loggers.get("Product API")

RoutesAPILogger.info("API call being loaded")
DatabaseLogger.info("Call from database sucessful")
ProductLogger.info("Product Found")

//Silly
//Verbose
//Critical
//Info
//Fatal
//


// winston.add(winston.transports.File, {filename: "errorlog.log"}) //Log file for errors
// winston.add(winston.transports.MongoDB, {db: "mongodb://localhost:27017/IntergrationTest", level: "error"})
//The MongoDB Object for error carries metadata that we can access




// winstonTest.otherMain("error")
// if(config.get("environment") === "development"){
//     const portDebug = require("debug")("portDebug")
// }