
const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const {SchemaModel, staffValidation} = require("./modelclass")
const z = require("zod")
const { validate } = require("./usermodel")

// const zodSchema = z.object({
//     id: z.string().min(1, {message: "Id must at least 1 character long"}),
//     email: z.string().min(5, "Error")
// })


const staffSchema = new mongoose.Schema({

    id: SchemaModel.id,
    email: {
        ...SchemaModel.email,
        ...SchemaModel.email.minLength = 10,
            validate: {
                validator: function(v) {
                    //Checking for email containing the word "Blackops" as Suffix
                    //a-z = lowercase 
                    //A-Z = uppercase
                    //0-9 = Numbers
                    
                    
                    return /@[a-zA-Z0-9_]+\blackops\b/.test(v)
                    //RegExp - Regular Expression
                },
                message: props => `${props.value} is not a valid email for logging to the Black Ops system.
                Please ensure your email is in the form of: name@blackops.org.uk
                `
            }
    },
    password: SchemaModel.password,
    isAdmin: {
        type: Boolean,
        // required: true,

    },
    RoleLevel: {
        type: Number,
        // required: true,
    }
 
})

staffSchema.methods.createToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.PRIVATE_KEY)
    return token 
}


const staffModel = mongoose.model("staffdetails", staffSchema)


const validateStaff = (user) => {
    const schema = Joi.object({
    id: Joi.number().required(),
    email: Joi.string().min(8).max(255).required(),
    password: Joi.string().min(8).max(1096).required()
})
    return schema.validate(user)
}


exports.staffModel = staffModel
exports.validateStaff = validateStaff




