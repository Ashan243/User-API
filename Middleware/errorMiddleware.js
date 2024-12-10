
const winston = require("winston")

module.exports = function(error, req, res, next){
    //Error handling system for the entire app controlled by this middle ware functions


    // winston.error(error.message, error) //Error Message + Error
    // winston.error("Error", error.messages) //Gives you error level and error message
    winston.log("error", error.message)
    //filename.log
    res.status(500).send("Error has occoured")
  
    
}

// Verbose, Critical, Fatal, silly, Information, Notice
//Debug