import mongoose from "mongoose";

const ConnectDb = async()=>{
   try {
    await mongoose.connect(process.env.database)
    console.log('database connected')
   } catch (error) {
    console.log(error)
    
   }
}

export default ConnectDb