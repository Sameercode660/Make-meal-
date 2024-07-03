import React, { useEffect } from 'react'
import useAuthentication from '../contexts/Authentication.context'
import {useNavigate} from 'react-router-dom'

function ForwardProtected({children}) {

  const {login} = useAuthentication()
  const navigation = useNavigate()

  useEffect(() => {
    console.log(login)
    if(!login) {
        navigation('/')
    }
  }, [login, navigation])
  return (
    <>
    {children}
    </>
  )
}

export default React.memo(ForwardProtected)
