import express from 'express'
const router = express.Router()
import {CheckLogin,admin} from '../Middleware/CheckLogin.js'
import {createPost,getAllPost} from '../Controller/PostController.js'

router.post('/createpost/:id',createPost)
router.get('/getallpost',getAllPost)


export default router