import express from 'express'
const router = express.Router()
import { registerUser,userLogin,allUser,userByid,deleteUser,updateUser,createUser, AdminAlluser } from '../Controller/UserController.js'
import {CheckLogin,admin} from '../Middleware/CheckLogin.js'



router.post('/newuser',registerUser)
router.post('/login',userLogin)
router.get('/alluser',CheckLogin,allUser)
router.get('/userbyid/:id',CheckLogin,userByid)
router.get('/adminalluser',admin,AdminAlluser)
router.delete('/deleteuser/:id',admin,deleteUser)
router.put('/updateuser/:id',admin,updateUser)
router.post('/createuser',admin,createUser)


export default router