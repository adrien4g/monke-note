const mongoose = require('mongoose')

const keySchema = new mongoose.Schema({
    key:{
        type: String,
        required: true,
        unique: true,
    },
    used:{
        type: Boolean,
        default: false,
    }
})
mongoose.model('Key', keySchema)