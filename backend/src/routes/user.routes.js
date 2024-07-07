import {Router} from 'express'
import {LoginWithToken, login, loginWithGoogle, newPassword, signup, verifyEmail, verifyForgotOtp} from '../controllers/user.contollers.js'
import { emptyCheck } from '../middlewares/emptyCheck.middlewares.js'
import {otpVerification} from '../controllers/user.contollers.js'
import { googleAuth } from '../controllers/user.contollers.js'

const userRouter = Router()

userRouter.route('/login').post(emptyCheck,login)
userRouter.route('/signup').post(emptyCheck, signup)
userRouter.route('/loginWithToken').post(emptyCheck, LoginWithToken)
userRouter.route('/verifyOtp').post(emptyCheck, otpVerification)
userRouter.route('/auth/google').post(emptyCheck, googleAuth)
userRouter.route('/login-with-google').post(emptyCheck, loginWithGoogle)
userRouter.route('/verify-email').post(emptyCheck, verifyEmail)
userRouter.route('/verify-forgot-otp').post(emptyCheck, verifyForgotOtp)
userRouter.route('/new-password').post(emptyCheck, newPassword)

export {
    userRouter 
}
