import { useEffect, useState } from 'react'
import './App.css'
import SignUp from './components/SignUp'
import useAuthentication from './contexts/Authentication.context'
import axios from 'axios'
import Home from './components/Home'

function App() {


  const {login, setLogin} = useAuthentication()

  // login with Token
  async function handleLoginWithToken() {
    try {
      if(!localStorage.getItem("token")) {
        setLogin(false)
      } else {
        const token = localStorage.getItem('token') 
 
        const response = await axios.post('http://localhost:8080/user/loginWithToken', {token})

        console.log(response.data)
        setLogin(true)
      }
    } catch (error) {
      console.log(error.response.data)
      setLogin(false)
    }
  }
  useEffect(() => {
    handleLoginWithToken()
  }, [])
  return (
    <>
    {
      login ? (<Home></Home>) : (<SignUp></SignUp>)
    }
    </>
  )
}

export default App
