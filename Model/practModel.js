

const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Joi = require("joi")


const practSchema =  new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true, 
        minLength: 8,
        maxLength: 255,
        unique: true
    },

    password:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 255
    },

    accountNo:{
        type: Number,
        required: true,
        unique: true
    }
})


practSchema.methods.createToken = function(){
const accessToken = jwt.sign({_id: this._id}, "privatekey")
return accessToken
}

const practModel = mongoose.model("practDetail", practSchema)



const validate = (users) =>{
    const schemaval = Joi.object({

        name: Joi.string().required(),
        email: Joi.string().required().min(8).max(255),
        password: Joi.string().required().min(8).max(255),
        accountNo: Joi.number().required()
    })

    return schemaval.validate(users)
}

exports.validate = validate
exports.practModel = practModel