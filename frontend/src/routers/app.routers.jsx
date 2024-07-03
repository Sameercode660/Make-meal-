import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Home from '../components/Home'
import ForwardProtected from '../protected/ForwardProtected'
import ReverseProtected from '../protected/ReverseProtected'
import OtpVerification from '../components/OtpVerification'
import RegisterInfo from '../components/RegisterInfo'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>
    },
    {
        path: '/login',
        element: <ReverseProtected><Login></Login></ReverseProtected>
    },
    {
        path: '/signup',
        element: <ReverseProtected><SignUp></SignUp></ReverseProtected>
    },
    {
        path: '/home',
        element: <ForwardProtected><Home></Home></ForwardProtected>
    },
    {
        path: '/otp',
        element: <OtpVerification></OtpVerification>
    },
    {
        path: "/register-details",
        element: <RegisterInfo></RegisterInfo>
    }
])