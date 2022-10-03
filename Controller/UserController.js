import { userModel } from "../model/UserSchema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const registerUser = async(req,res)=>{
    const {name,email,password} = req.body
    try {

        userModel.findOne({email},async(err,doc)=>{
            if(doc){
                return res.json({msg:'user already exits'})

            }
            else{
                const hashPassword = await bcrypt.hash(password,10)
                    const data = await userModel({
                        name,email,password:hashPassword,isAdmin:false
                    })
                    const result = await data.save()
                    const token = await jwt.sign({id:result._id,name:result.name},process.env.jwt_secret,{expiresIn:'1h'})
                   
                    return res.status(201).json({msg:'registered successfully', data:result,'token':token})
                
                    
            }
            
        })
   
    
        
    } catch (error) {
        console.log(error)
        
    }
}


export const userLogin = async(req,res)=>{
    const {email,password} = req.body
    try {
        userModel.findOne({email},async(err,doc)=>{
            if(!doc){
                return res.json({msg:'user does not exit!'})
            }else{
                const validate = await bcrypt.compare(password,doc.password)
                if(validate){
                    const token = await jwt.sign({id:doc._id,name:doc.name},process.env.jwt_secret,{expiresIn:'1h'})
                   return res.status(200).json({ msg:'login successfully!',data:doc, id:doc._id, token:token})

                }else{
                    return res.json({msg:'password does not match!'})

                }
            }

        })
        
    } catch (error) {
        console.log(error)
        
    }
}


export const userByid = async(req,res)=>{
    try {
        const {id} = req.params
    const data = await userModel.findById(id).populate('post')
    res.json(data)
    } catch (error) {
        console.log(error)
        
    }
}

export const allUser = async(req,res)=>{
    // console.log(req.headers)
    try {

        const data = await userModel.find()
        const newData = data.map((item)=>({
            id:item._id,
            name:item.name
        }))
        res.status(200).json({'data':newData}) 
    } catch (error) {
        console.log(error)
        
    }
}


export const AdminAlluser = async(req,res)=>{
    const {search, limit,sort,filter,order} = req.query
    //  console.log(req.query)
    try {

        const data = await userModel.find()
        const newData = data.map((item)=>({
            id:item._id,
            name:item.name,
            email:item.email,
            password:item.password

        }))

        let sendData = [...newData]

        // search data

        if(search){
            sendData = sendData.filter((item)=>{
                return item.name.startsWith(search)
            }) 
          
        }

        // limit data
        if(limit){
            sendData = sendData.slice(0,Number(limit))
           
        }

        // sort data by name
        if(sort==='name'&&order&&order==='asc'){
            sendData = sendData.sort((a,b)=>{
                let nameA = a.name
                let nameB = b.name
                if(nameA>nameB){
                    return 1
                }else if(nameA<nameB){
                    return -1
                }else{
                    return 0
                }
            })
           

        }

        // sort data by email
        if(sort==='email'&&order&&order==='asc'){
            sendData = sendData.sort((a,b)=>{
                let emailA = a.email
                let emailB = b.email
                if(emailA>emailB){
                    return 1
                }else if(emailA<emailB){
                    return -1
                }else{
                    return 0
                }
            })
           

        }


        // filter data
        // if(filter=='name'){
        //     sendData = sendData.map((item)=>({name:item.name}))
        // }

        
        

        if(sendData.length<1){
           return res.json({msg:'no data available'})
        }

       return res.status(200).json({'data':sendData}) 
    } catch (error) {
        console.log(error)
        
    }

}

export const deleteUser = async(req,res)=>{
    const {id} = req.params
    try {
       
            const data = await userModel.findById(id)
            if(!data){
                res.json({msg:'no user exits with this id!'})
            }else{
                 await userModel.findByIdAndDelete(id)
                res.status(200).json({msg:'user delete successfully!'})

            }

    } catch (error) {
        console.log(error)
        
    }
}



export const updateUser = async(req,res)=>{
    // console.log(req.body)
    const {password} = req.body
    const {id} = req.params
    try {
        const hashPassword = await bcrypt.hash(password,10)
        await userModel.findByIdAndUpdate(id,{...req.body,password:hashPassword})
        res.status(200).json({msg:'user update successfully!'})
        
    } catch (error) {
        console.log(error)
        
    }
}

export const createUser = async(req,res)=>{
    const {name,email,password} = req.body
    

    try {

        userModel.findOne({email},async(err,doc)=>{
            if(doc){
                return res.json({msg:'user already exits'})

            }
            else{
                const hashPassword = await bcrypt.hash(password,10)
                    const data = await userModel({
                        name,email,password:hashPassword,isAdmin:false
                    })
                    const result = await data.save()
                    return res.status(201).json({msg:'user created successfully', data:result,})
                
                    
            }
            
        })
   
    
        
    } catch (error) {
        console.log(error)
        
    }

}

//fetch("/users", {
    // method: "Get",
    // headers: {
    //   "content-type": "application/json",
    //   Authorization: "Bearer" + localStorage.getItem("token")
    // }


    // axios.post('http://yourendpoint',data,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
    //         .then(response=> console.log(response))
    //         .catch(error => console.log(error));
  
    