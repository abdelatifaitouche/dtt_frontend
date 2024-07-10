import React, { useContext , useState , useEffect } from 'react'
import {  Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import useAxios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function NavBar(){

    const [showMenu , setShowMenu] = React.useState(true)
    let { user, logoutUser } = useContext(AuthContext)

    const [username , setUsername] = useState('')
  const toggleMenu = ()=>{
    setShowMenu(prev => !prev);
    console.log(showMenu);
  }

  const [res , setRes] = useState('')

  console.log('from nav bar')
  console.log(localStorage.getItem('authTokens'))
 



    return(
    <>



    <aside id="logo-sidebar"
    class="fixed shadow-md top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar">
              
    <div class="h-full px-3 py-4 overflow-y-auto bg-white flex flex-col justify-between">
        
        <ul class="space-y-2 font-medium">
            <a href="#" class="flex items-center ps-2.5 mb-5">
                <img src={require('../assets/logo_gt.png')} class="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                <span class="self-center text-l font-semibold whitespace-nowrap dark:text-white">AI Consultant</span>
            </a>
            <a href="#" class="flex items-center ps-2.5 mb-5">

                <h1 class="mb-4 text-sm font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-sm dark:text-white"><span class="text-purple-600 dark:text-blue-500">Welcome,{username}</span></h1>
            </a>
            <div>
                <li>
                
                    <Link to="/"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 22 21">
                            <path
                                d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                            <path
                                d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span class="ms-3">Dashboard</span>
                    </Link>
                </li>

                <li>
                    <Link to="/chatbot" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i class="fa-brands fa-rocketchat"></i>
                       <span class="flex-1 ms-3 whitespace-nowrap">Chatbot</span>
                       <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-white bg-purple-600 rounded-full dark:bg-purple-700 dark:text-white">Pro</span>
                    </Link>
                 </li>

                <li>
                    <a href="#"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i class="fa-solid fa-circle-info"></i>
                        <span class="ms-3">Help</span>
                    </a>
                </li>
            </div>
            

            
        </ul>
        <div>
            <div>
                <button onClick={logoutUser}
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                </button>
            </div>
            <br/>
            <a href="" class="flex items-center ps-2.5 mb-5">
                <img src={require('../assets/logo_gt.png')} class="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                <span class="self-center text-sm font-semibold whitespace-nowrap dark:text-white">Powered by Grant thornton</span>
            </a>
        </div>
        
    </div>
</aside>

    
    </>
   
);
}


