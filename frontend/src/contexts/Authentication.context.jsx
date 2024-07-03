import { createContext, useContext, useState } from "react";


// this is a context used for user authentication
const UserAuthenticated = createContext()


// authentication provider that wraps the whole app and provide a acess of the data in app
export const UserAuthenticationProvider = ({children}) => {

    const [login, setLogin] = useState(false)
    const [_id, set_Id] = useState('')
    let userData = {}
    return (
        <UserAuthenticated.Provider value={{login, setLogin, _id, set_Id, userData}}>
            {children}
        </UserAuthenticated.Provider>
    )
}


// custom hook for context
export default function useAuthentication() {
    return useContext(UserAuthenticated)
}