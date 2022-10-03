import mongoose from "mongoose";
const UserSchema =new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    isAdmin:{type:Boolean},
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Posts"
        }
    ]
})

const postSchema = new mongoose.Schema({
    title: String,
    description:String,
    image:{
        type:Object
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "newusers"
    }
})


export const userModel = mongoose.model('newusers',UserSchema)
export const postModel = mongoose.model('Posts',postSchema)