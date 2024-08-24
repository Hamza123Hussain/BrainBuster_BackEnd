import express from 'express'
import { SignUpController } from '../Controllers/Auth/SignUP.js'
import { LoginController } from '../Controllers/Auth/Login.js'
import { SignOutController } from '../Controllers/Auth/SignOut.js'

const AuthRouter = express.Router()

AuthRouter.post('/', SignUpController)
AuthRouter.post('/Login', LoginController)
AuthRouter.get('/', SignOutController)

export default AuthRouter
