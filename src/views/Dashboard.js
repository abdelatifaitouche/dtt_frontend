import React, { useEffect, useState, useContext } from 'react'
import NavBar from '../Components/NavBar'
import Services from '../Components/Services'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Chatbot from './Chatbot'
import PrivateRoute from '../utils/PrivateRoute'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import { ReactTyped } from "react-typed";




function Dashboard() {

    const API_COUNTRIES = 'https://dtt-production.up.railway.app/api/countries/'
    const [data, setData] = useState(() => localStorage.getItem('countries') ? localStorage.getItem('countries') : [])
    const { authTokens } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        country_id: 0,
        max_presence: 0
    })

    const [apiResponse, setApiResponse] = useState('')


    const getCountries = async () => {
        await axios.get(API_COUNTRIES, {
            headers: {
                Authorization: `Bearer ${authTokens?.access}`
            },

        }).then(response => {
            setData(response.data.Countries)
        })


    }

    useEffect(() => {
        getCountries()
    }, [])



    const sendServiceData = async (e) => {
        e.preventDefault()
        console.log(formData)
        try {
            const response = await axios.post('https://dtt-production.up.railway.app/api/services/', {
                country_id: formData.country_id,
                max_presence: formData.max_presence
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response.data);
            setApiResponse(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    function handleInputChange(event) {
        const { name, value } = event.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div>
            <NavBar />
            <div class="p-4 sm:ml-64">
                <div className='dashboard' class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h1 class="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-xl dark:text-white">Please, select a <span class="text-purple-600 dark:text-blue-500">Country</span> To learn more</h1>
                    <form class="flex items-center justify-center  gap-2 my-7" onSubmit={sendServiceData}>
                        <select options={data.Countries} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='country_id'>
                            <option defaultValue>
                                Select Country
                            </option>

                            {data.map((option) => {
                                return (
                                    <option key={option.id} value={option.id}>
                                        {option.country_name}
                                    </option>
                                );
                            })}


                        </select>
                        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name='max_presence' placeholder='max presence' onChange={handleInputChange} />
                        <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2" type="submit">filter</button>
                    </form>

                    <div>
                        <div class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            {apiResponse.answer && <ReactTyped strings={[apiResponse.answer]} typeSpeed={20} />}
                        </div>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default Dashboard
