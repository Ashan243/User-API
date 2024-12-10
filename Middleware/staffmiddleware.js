const jwt = require("jsonwebtoken")
const error = require("./errorMiddleware")



module.exports = function staffAuth(req, res, next){
    const staffToken = req.header("x-auth-stafflogin") //Key-Value pair setup, utilising the key to access to the JWT token assoicated with the key
    if(!staffToken) return res.status(401).send("Access Denied")

    //Read the JWT token in it's decoded/decrypted form to check the user
    
    try {
        const verification = jwt.verify(staffToken, process.env.PRIVATE_KEY)//Verify that the client computer user is who they say are 
        req.body = verification //Payload of the jwt = body of the client request 
        next()//Passing to the next middleware function
    } catch (error) {
        res.status(400).send("Invalid Authentication Token")
        console.log(error)

        //Redirect the user to 400 page res.redirect("URL")
    }
    
}



