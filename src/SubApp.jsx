import React, { createContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GetUser from './Components/GetUser'
import Home from './Components/Home'
import { useMe } from './Components/hooks/me'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Register from './Components/Register'

export const AuthProvider = createContext({
    setToken: (_str) => {},
    me: null,
    setMe: (_str) => {},
    admin: false,
    isLoading: false
})

function SubApp() {

    const [token, setToken] = React.useState('')
    const [me, setMe] = React.useState(null)
    const isAdmin = me?.user?.roles?.filter(role => role.role === 'admin').length > 0
    const {mutateAsync, isLoading} = useMe()

    useEffect(() => {
        mutateAsync(token).then(setMe)
    }, [token, mutateAsync])

    return (
        <AuthProvider.Provider value={{me, isLoading, setMe, setToken, admin: isAdmin}}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path='/user/:id' element={<GetUser />} />
                </Routes>        
            </BrowserRouter>
        </AuthProvider.Provider>
    )
}

export default SubApp
