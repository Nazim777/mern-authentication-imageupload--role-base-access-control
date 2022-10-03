import express from 'express'
const app = express()
import dotenv from 'dotenv'
import ConnectDb from './db/ConnectDb.js'
import cors from 'cors'
dotenv.config()
import router from './Route/UserRouter.js'
import Postrouter from './Route/PostRouter.js'


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json())
app.use(router)
app.use(Postrouter)
ConnectDb()



app.listen(process.env.port,()=>{
    console.log('server listening on port 5000')
})