import React, { useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { waveform } from 'ldrs'
waveform.register()



function Redevences({ countries }) {




    const [countryID, setCountryId] = useState(0)
    const [apiResponse, setApiResponse] = useState([])

    function handleInputChange(event) {
        const { name, value } = event.target
        setCountryId(value)
    }
    const { authTokens } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)



    const getRedevences = (e) => {
        e.preventDefault()
        setLoading(true)
        axios({
            method: "GET",
            url: `https://dtt-production.up.railway.app/api/redevences/${countryID}`,
            headers: {
                Authorization: `Bearer ${authTokens.access}`,
            },
        }).then((response) => {
            console.log(response.data.country_conditions)
            setApiResponse(response.data.country_conditions)
            setLoading(false)
        });
    }
    return (
        <>
            <br></br>
            <div className='dashboard' class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h1 class="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-xl dark:text-white">Please, select a <span class="text-purple-600 dark:text-blue-500">Country</span> To learn more</h1>
                <form onSubmit={getRedevences} class="flex items-center justify-center  gap-2 my-7" >
                    <select onChange={handleInputChange} options={countries} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='country_id'>
                        <option defaultValue>
                            Select Country
                        </option>

                        {countries.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                    {option.country_name}
                                </option>
                            );
                        })}




                    </select>

                    <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2" type="submit">filter</button>
                </form>
                <div>
                    {loading ? <l-waveform
                        size="35"
                        stroke="3.5"
                        speed="1"
                        color="black"
                    ></l-waveform> : ''}
                    {Array.isArray(apiResponse) &&
                        apiResponse.map((e, index) => (
                            <div key={index} className="block p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <div>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Zm2 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Z" clipRule="evenodd" />
                                    </svg>
                                    <p>Condition: </p>
                                    <p>{e.condition}</p>
                                </div>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" clipRule="evenodd" />
                                    <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                                </svg>
                            </div>
                        ))
                    }

                </div>


            </div>

        </>

    )
}

export default Redevences
