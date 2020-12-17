const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    email:{
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    memberAt:{
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hashSync(this.password, 10)
    this.password = hash
    next()
} )

mongoose.model('User', userSchema)