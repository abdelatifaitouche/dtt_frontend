import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import useAxios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function NavBar() {

    const [showMenu, setShowMenu] = React.useState(true)
    let { user, logoutUser } = useContext(AuthContext)

    const toggleMenu = () => {
        setShowMenu(prev => !prev);
        console.log(showMenu);
    }

    const [username, setUsername] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')).username : "")




    return (
        <>



            <aside id="logo-sidebar"
                class="fixed shadow-md top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar">

                <div class="h-full px-3 py-4 overflow-y-auto bg-white flex flex-col justify-between">

                    <ul class="space-y-2 font-medium">
                        <a href="#" class="flex items-center ps-2.5 mb-5">
                            <img src={require('../assets/logo_gt.png')} class="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                            <span class="self-center items-center text-md font-bold text-black-600 dark:text-white md:text-md lg:text-md">Tax-Advisor <span class="text-transparent bg-clip-text bg-gradient-to-r to-green-500 from-purple-800">PRO</span></span>
                        </a>
                        <a href="#" class="flex items-center ps-2.5 mb-5">

                            <h1 class="mb-4 text-sm font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-sm dark:text-white"><span class="text-purple-600 dark:text-blue-500">Welcome, </span>{username}</h1>
                        </a>
                        <div>
                            <li>

                                <Link to="/dashboard"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11 21V2.352A3.451 3.451 0 0 0 9.5 2a3.5 3.5 0 0 0-3.261 2.238A3.5 3.5 0 0 0 4.04 8.015a3.518 3.518 0 0 0-.766 1.128c-.042.1-.064.209-.1.313a3.34 3.34 0 0 0-.106.344 3.463 3.463 0 0 0 .02 1.468A4.017 4.017 0 0 0 2.3 12.5l-.015.036a3.861 3.861 0 0 0-.216.779A3.968 3.968 0 0 0 2 14c.003.24.027.48.072.716a4 4 0 0 0 .235.832c.006.014.015.027.021.041a3.85 3.85 0 0 0 .417.727c.105.146.219.285.342.415.072.076.148.146.225.216.1.091.205.179.315.26.11.081.2.14.308.2.02.013.039.028.059.04v.053a3.506 3.506 0 0 0 3.03 3.469 3.426 3.426 0 0 0 4.154.577A.972.972 0 0 1 11 21Zm10.934-7.68a3.956 3.956 0 0 0-.215-.779l-.017-.038a4.016 4.016 0 0 0-.79-1.235 3.417 3.417 0 0 0 .017-1.468 3.387 3.387 0 0 0-.1-.333c-.034-.108-.057-.22-.1-.324a3.517 3.517 0 0 0-.766-1.128 3.5 3.5 0 0 0-2.202-3.777A3.5 3.5 0 0 0 14.5 2a3.451 3.451 0 0 0-1.5.352V21a.972.972 0 0 1-.184.546 3.426 3.426 0 0 0 4.154-.577A3.506 3.506 0 0 0 20 17.5v-.049c.02-.012.039-.027.059-.04.106-.064.208-.13.308-.2s.214-.169.315-.26c.077-.07.153-.14.225-.216a4.007 4.007 0 0 0 .459-.588c.115-.176.215-.361.3-.554.006-.014.015-.027.021-.041.087-.213.156-.434.205-.659.013-.057.024-.115.035-.173.046-.237.07-.478.073-.72a3.948 3.948 0 0 0-.066-.68Z" />
                                    </svg>

                                    <span class="ms-3">Dashboard</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/chatbot" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clip-rule="evenodd" />
                                    </svg>

                                    <span class="flex-1 ms-3 whitespace-nowrap">Chatbot</span>
                                    <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-white bg-purple-600 rounded-full dark:bg-purple-700 dark:text-white">Pro</span>
                                </Link>
                            </li>

                            <li>
                                <a href="#"
                                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd" />
                                    </svg>
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
                        <br />
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


