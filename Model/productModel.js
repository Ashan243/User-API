const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")




const productSchema = new mongoose.Schema({

    
    id:{
        type: Number,
        unique: true
    },
    
    name:{
        type: String,
        // required: true
        
    },

   
    nickname:{
        type:[String],
        enum: ["mcs"],
        // set: function(v) {
        //     return this.enum.push(v)
        // }
        
    },

    
    price:{
        type: Number,
        // required: true
    },


    productNumber:{
        type: Number,
        // required: true,
        // unique: true,
       
    },

    
    brand:{
        type: String,
        // required: true,
    },

    
    itemDescription:{
        type: String,
        // required: true
    },


    productImage:{
        type: String,
        // required: true
    },

    stock:{
        type: Number,
        // min: 1,
        // max: 9,
        // required: true,

        
    },
    
    

})

productSchema.methods.createToken = function(){
    const token = jwt.sign({_id: this._id}, "privatekey")
    return token
}   

const productModel = mongoose.model("product", productSchema)





const productValidation = (user) =>{
    const validateSchema = Joi.object({

    id: Joi.number().required(),
    name: Joi.string().required(),
    nickname: Joi.array(),
    price: Joi.number().required(),
    productNumber: Joi.number().required(),
    brand: Joi.string().required(),
    itemDescription: Joi.string().required(),
    productImage: Joi.string().required(),
    stock: Joi.number().min(1).max(9).required(), 
})

return validateSchema.validate(user)
}

exports.productValidation = productValidation
exports.pModel = productModel