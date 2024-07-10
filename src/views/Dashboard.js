import React from 'react'
import NavBar from '../Components/NavBar'
import Services from '../Components/Services'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Chatbot from './Chatbot'
import PrivateRoute from '../utils/PrivateRoute'
function Dashboard() {
    return (
        <div>
            <NavBar />
           
        </div>
    )
}

export default Dashboard
