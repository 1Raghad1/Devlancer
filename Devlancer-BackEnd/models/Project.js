const mongoose = require('mongoose')

//create mongoose schema 
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title:{
        //validations
        type: String,
        required: true,
    },
    description:{
        //validations
        type: String,
        required: true,
    },
    price:{
        //validations
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["byHour", "fixed"],
        required: true
    },
    pic:{
        //validations
        type: String,
        trim: true,
    },
    tags:[
        {
        //validations
        type: String,
        required: true,
        }
    ],
    client_id:{
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
    },
    freelancer_id:{
          type: Schema.Types.ObjectId,
          ref: "User"
    },
    freelancer_ids: [
        {
            type:String
        }
    ]
    }, 
 {timestamps: true}) //field when it's created and when it's modified

//'User' the name we are using
const Project = mongoose.model('project', projectSchema)

module.exports = Project