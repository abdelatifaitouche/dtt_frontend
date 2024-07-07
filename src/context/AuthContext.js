import {createContext , useState , useEffect} from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'



const AuthContext = createContext()

export default AuthContext 

export const AuthProvider = ({children})=>{

    const API_URL_AUTH_TOKEN = "https://dtt-production.up.railway.app/api/token/"
    const API_URL_REFRESH_TOKEN = "https://dtt-production.up.railway.app/api/token/refresh/"
    const API_URL_REGISTER = 'https://dtt-production.up.railway.app/api/register/'


    const [authTokens , setAuthTokens] = useState(()=>{
        localStorage.getItem('authTokens')?
        JSON.parse(localStorage.getItem('authTokens')):
        null
    })

    const [user , setUser] = useState(()=>{
        localStorage.getItem('authTokens')?
        jwtDecode(localStorage.getItem('authTokens')):
        null
    })


    const [loading , setLoading] = useState(true)

    const history = useNavigate()

    const loginUser = async (email , password)=>{
        const response = await fetch(API_URL_AUTH_TOKEN , {
            method : 'POST',
            headers : {
                "Content-Type" :'application/json'
            },
            body : JSON.stringify({email , password})
        })

        const data = await response.json()
        console.log(data)

        if(response.status === 200){
            console.log('logged in')
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authToken' , JSON.stringify(data))
            history('/')

        }else{
            console.log(response.status)
            alert('somehitng went wrong')
        }
    }

    const registerUser = async (email , username , password , password2) =>{
        const response = await fetch(API_URL_REGISTER, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email , username , password , password2})
        })

        if(response.status === 201){
            history('/login')

        }else{
            alert('something went wrong')
        }
    }

    const logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/login')
    }

    const ContextData = {
        user , setUser , authTokens , setAuthTokens , registerUser , loginUser , logoutUser
    }

    useEffect(()=>{
        if(authTokens){
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)
    } , [authTokens , loading])

    return(
        <AuthContext.Provider value={ContextData}>
            {loading?null : children}
        </AuthContext.Provider>
    )
}