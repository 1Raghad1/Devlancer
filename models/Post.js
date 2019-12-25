const mongoose = require('mongoose')

//create mongoose schema 
const Schema = mongoose.Schema

const PostSchema = new Schema({
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
    tags:[
        {
        //validations
        type: String,
        required: true,
        }
    ],
       comments: [{
        type: String,
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
 User_id:{
          type: Schema.Types.ObjectId,
          ref: "User",
        required: true,
    },
     User_name:{
       type:String,
        required: true,
    },

    date:{
        type: Date,
  },
    }, 
 {timestamps: true}) //field when it's created and when it's modified

//'User' the name we are using
const Post = mongoose.model('post', PostSchema)

module.exports = Post