//require mangoose
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//create mongoose schema 
const Schema = mongoose.Schema

//has single filed username
const userSchema = new Schema({
    
    firstname:{
        //validations
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        //validations
        type: String,
        required: true,
        trim: true
    },
    email:{
        //validations
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password:{
        //validations
        type: String,
        required: true,
        minlength: 6 
    },
    type: {
        type: String,
        enum: ["client", "freelancer"],
        required: true
    },
    state: {
        type: Boolean,
    }
    },
 {timestamps: true}) //field when it's created and when it's modified

//  userSchema.pre('save', async function (next) {
//     // Hash the password before saving the user model
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })

// userSchema.methods.generateAuthToken = async function() {
//     // Generate an auth token for the user
//     const user = this
//     const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
//     user.tokens = user.tokens.concat({token})
//     await user.save()
//     return token
// }

// userSchema.statics.findByCredentials = async (email, password) => {
//     // Search for a user by email and password.
//     const user = await User.findOne({ email}).exec()
//     if (!user) {
//         throw new Error({ error: 'Invalid login credentials' })
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password)
//     if (!isPasswordMatch) {
//         throw new Error({ error: 'Invalid login credentials' })
//     }
//     return user
// }

//'User' the name we are using
const User = mongoose.model('User', userSchema)

module.exports = User

// npm i bcryptjs body-parser concurrently express is-empty jsonwebtoken mongoose passport passport-jwt validator