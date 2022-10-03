import jwt from 'jsonwebtoken'
import { userModel } from '../model/UserSchema.js'

export const CheckLogin = async(req,res,next)=>{
   const {authorization} = req.headers 
//    console.log(req.headers)
   try {
    const token = authorization.split(' ')[1]
    if(!token){
        res.json({msg:'access denied, user not authenticated!'})

    }else{
        const verifyToken = await jwt.verify(token,process.env.jwt_secret)
        if(!verifyToken){
            res.json({msg:'access denied, user not authenticated!'})

        }else{
            req.user = verifyToken 
            next()
        }
    }
    
   } catch (error) {
    res.json({msg:'access denied,please provide valid jwt token!'})
    
   }
    
}


export const admin = async(req,res,next)=>{
    const {authorization} = req.headers
   // console.log(req.headers)
    
    try {
        const token = authorization.split(' ')[1]
        if(!token){
            res.json({msg:'access denied, user not authenticated!'})

        }else{
            const verifyToken = await jwt.verify(token,process.env.jwt_secret)
            if(!verifyToken){
                res.json({msg:'access denied, user not authenticated!'})

            }else{
                const {id} = verifyToken
                const data = await userModel.findById(id)
                if(data.isAdmin!==true){
                    res.json({msg:'access denied!'})
                   
                }else{
                    next()
                }
                

            }
        }
        
    } catch (error) {

        res.json({msg:'access denied,please provide valid jwt token!'})
        
    }

}












// export const CheckLogin = async(req,res,next)=>{
//     try {
//         const {authorization} = req.headers
//     const token = authorization.split(' ')[1]
//     const verifyToken = await jwt.verify(token,process.env.jwt_secret)
//     if(!verifyToken){
//         res.json({msg:'access denied, user not authenticated!'})
//     }else{
//         req.user = verifyToken
//         next()
//     }
        
//     } catch (error) {
//         next('please provide jwt token!')
//     }
    
    
// }