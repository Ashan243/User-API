

const express = require("express")
const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({

    // id:{
    //     type: Number,
    //     unique: true
    // },

    email:{
        type: String,
        minLength: 8,
        maxLength: 255,
        required: true,
        unique: true
    },

    password:{
        type: String,
        minLength: 8,
        maxLength: 1096,
        required: true,
    },
    isStaffMember: {
        type: Boolean
    }

    
})



userSchema.methods.createToken = function(){
    const accessToken = jwt.sign({_id: this._id, isStaffMember: this.isStaffMember}, "privatekey")
    return accessToken
}

const userModel = mongoose.model("intergrationtests", userSchema)


const validate = (users) =>{
    const valSchema = Joi.object({

        email: Joi.string().min(8).max(255).required(),
        password: Joi.string().min(8).max(1096).required(),

        
        
    })
    return valSchema.validate(users)
}
  


   


    exports.validate = validate
    exports.userModel = userModel

