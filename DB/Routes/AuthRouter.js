import express from 'express'
import { SignUpController } from '../Controllers/Auth/SignUP.js'
import { LoginController } from '../Controllers/Auth/Login.js'
import { SignOutController } from '../Controllers/Auth/SignOut.js'
import multer from 'multer'

const AuthRouter = express.Router()
const upload = multer({ storage: multer.memoryStorage() })
AuthRouter.post('/', upload.single('image'), SignUpController)
AuthRouter.post('/Login', LoginController)
AuthRouter.get('/', SignOutController)

export default AuthRouter
