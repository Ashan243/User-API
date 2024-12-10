const mongoose = require("mongoose")
const Joi = require("joi")


const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255,
    },
    numberOfLinks: {
        type: Number,
        required: true,
        min: 0,
        max: 30
    }
})

const model = mongoose.model("staff", staffSchema)


const validation = (staff) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255),
        numberOfLinks: Joi.number().min(0).max(30)
    })
    return schema.validate(staff)
}


exports.model = model
exports.staffSchema = staffSchema
exports.validation = validation
