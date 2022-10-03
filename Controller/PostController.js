import { postModel,userModel } from "../model/UserSchema.js";
import cloudinary from '../Utils/Claudinary.js'

export const createPost = async(req,res)=>{
    try {
        const {title,description,image} = req.body
        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image, {
              upload_preset: "blogimage",
            });
              if(uploadedResponse){


                const {id} = req.params 
                const data =  postModel({
                    title,
                    description,
                    image:uploadedResponse,
                    postedBy:id
                })
                const result = await data.save()
                await userModel.findByIdAndUpdate(id,{$push:{post:result._id}})
                res.json({msg:'post create successfully!',data:result})
              }


        }
        
    } catch (error) {
        console.log(error)
        
    }
}

export const getAllPost = async(req,res) =>{
    try {
        const data = await postModel.find().populate('postedBy')
        res.json(data)
        
    } catch (error) {
        console.log(error)
        
    }
}