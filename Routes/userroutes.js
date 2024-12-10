const {validate, userModel} = require("../Model/usermodel")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const authMiddleware = require("../Middleware/authMiddleware")
const errorMiddleware = require("../Middleware/errorMiddleware")



//api/users/signup
router.post("/signup", errorMiddleware, async(req, res) =>{
   
    
    const {error} = validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    let userEmail = await userModel.findOne({email:req.body.email})
    if (userEmail) return res.status(400).send("User Already Exists")
 
    userEmail = new userModel({
        email: req.body.email,
        password: req.body.password
    })
    
    const salt = await bcrypt.genSalt(15)
    userEmail.password = await bcrypt.hash(userEmail.password, salt)

    await userEmail.save()
    const token = userEmail.createToken()
    res.header("x-auth-user", token).status(200).json({
        message: "Success",
        extraInfo: "This was a test"
    })
})


router.post("/signin", errorMiddleware ,async(req, res) =>{

    const {error} = validate(req.body)
    //Joi Validation = Synthanical Validation Only
    if (error) return res.status(400).send("Invalid Data Format")

    const user = await userModel.findOne({email: req.body.email})
    if (!user) return res.status(400).send("Invalid Email or Password")

    //Bcrypt compare to compare the hashed password to the user password
    const password = await bcrypt.compare(req.body.password,  user.password)
    if(!password) return res.status(400).send("Invalid Email or Password")

    //User has passed verification
    // res.redirect("Redirect user to profitle page (pug dynamic page)").send()



})


router.put("/updatemail", authMiddleware ,async(req, res) =>{

    const {error} = validate(req.body)
    if (error) return res.status(400).send("Invalid data")

    const userUpdate = userModel.findOneAndUpdate({email: req.body.currentEmail}, {email: req.body.newEmail})
    if(!userUpdate) return res.status(400).send("Error updating email")

    res.status(200).send("Email Updated")
})



router.get("/getemail", async(req, res) => {
    const checkEmail = await userModel.find({email: req.body.email})
    res.send(checkEmail)
})


router.get("/checkerror", async() =>{

    throw new Error("Trying to check error")
})




router.delete("/deleteaccount", async(req, res) =>{
 
    const deleteUserAccount = await userModel.findOneAndDelete({email: req.body.email})
    if (!deleteUserAccount) return res.status(404).send("User Not Found")

    
    try {
        
        res.send("User Succsessfully Deleted")

    } catch {
        
        res.status(400).send("Error Deleting User")
    }
    


})






    



module.exports = router

