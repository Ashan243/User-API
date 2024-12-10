const winston = require("winston")
const {combine, timestamp, json, prettyPrint, errors} = winston.format
require("winston-mongodb")

//Adding our logs
winston.loggers.add("API Calls", {
    level: 'error',
    format: combine(
     timestamp(),
     json(),
     prettyPrint(),
     // printf((info) => `${info.timestamp}${info.level}: ${info.message}`)
    ),
 //    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'api.log', level: 'error' }),]
    


//   const testCall = { method: "API CALL - POST", jwtAuth: true}

//   logger.error("Testing", testCall )
//   logger.info("MongoDB")
  
})
// winston.loggers.add("Database", {
//     level: 'verbose',
//     format: combine(
//      errors({stack: true}),
//      timestamp(),
//      json(),
//      prettyPrint(),
//      // printf((info) => `${info.timestamp}${info.level}: ${info.message}`)
//     ),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//       //
//       // - Write all logs with importance level of `error` or less to `error.log`
//       // - Write all logs with importance level of `info` or less to `combined.log`
//       //
//       new winston.transports.File({filename:"database.log", level: "verbose"}),
//       new winston.transports.MongoDB({db: "mongodb://localhost:27017", dbName: "Inter"})
//     ],


// //   const testCall = { method: "API CALL - POST", jwtAuth: true}

// //   logger.error("Testing", testCall )
// //   logger.info("MongoDB")
  
//})
winston.loggers.add("Product API", {
    level: 'critical',
    format: combine(
     timestamp(),
     json(),
     
     // printf((info) => `${info.timestamp}${info.level}: ${info.message}`)
    ),
    defaultMeta: { service: "Product API" },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //uct API
       new winston.transports.File({filename: "Product API", level: "critical"})
    ],


//   const testCall = { method: "API CALL - POST", jwtAuth: true}

//   logger.error("Testing", testCall )
//   logger.info("MongoDB")
  
})




