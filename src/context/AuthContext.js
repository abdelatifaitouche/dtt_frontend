import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    

    const API_URL_AUTH_TOKEN = "https://dtt-production.up.railway.app/api/token/"
    const API_URL_REFRESH_TOKEN = "https://dtt-production.up.railway.app/api/token/refresh/"
    const API_URL_REGISTER = 'https://dtt-production.up.railway.app/api/register/'

    let [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))
    let [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    let loginUser = async (e) => {
        setLoading(true)
        e.preventDefault()
        const response = await fetch(API_URL_AUTH_TOKEN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: e.target.email.value, password: e.target.password.value })
        });

        let data = await response.json();

        if(data){
            setLoading(false)
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            navigate('/dashboard')
            Swal.fire({
                title : 'logged In',
                icon : 'success',
                toast : 'true',
                timer : '3000',
                position : 'top-right',
                showConfirmButton : 'false'
                
            })
        } else {
            alert('Something went wrong while logging in the user!')
            Swal.fire({
                title : 'Please, Verifiy your Informations',
                icon : 'error',
                toast : 'true',
                timer : '3000',
                position : 'top-right',
                showConfirmButton : 'false'
                
            })
        }
    }

    let logoutUser = (e) => {
        e.preventDefault()
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        navigate('/login')
        Swal.fire({
            title : 'logged Out',
            icon : 'success',
            toast : 'true',
            timer : '3000',
            position : 'top-right',
            showConfirmButton : 'false'
            
        })
    }

    const updateToken = async () => {
        const response = await fetch(API_URL_REFRESH_TOKEN, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refresh:authTokens?.refresh})
        })

        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        loading
    }

    useEffect(()=>{
        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
        let interval = setInterval(()=>{
            if(authTokens){
                console.log('update the token')
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    },[authTokens])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}