import React , {useState , useContext , useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import { ReactTyped } from "react-typed";
import axios from 'axios'
import { waveform } from 'ldrs'
waveform.register()




function Services({countries}) {

    const { authTokens } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        country_id: 0,
        max_presence: 0
    })

    const [apiResponse, setApiResponse] = useState('')
    const [loading , setLoading] = useState(true)

    



    const sendServiceData = async (e) => {
        e.preventDefault()
        setApiResponse('')
        setLoading(true)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/services/', {
                country_id: formData.country_id,
                max_presence: formData.max_presence
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response.data.answer[0].reponse);
            
            setApiResponse(response.data.answer[0].reponse)
            setLoading(false)

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
    <>
        <br></br>
        <div className='dashboard' class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    
                    <h1 class="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-xl dark:text-white">Please, select a <span class="text-purple-600 dark:text-blue-500">Country</span> To learn more</h1>
                    <form class="flex items-center justify-center  gap-2 my-7" onSubmit={sendServiceData}>
                        <select options={countries} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='country_id'>
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
                        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name='max_presence' placeholder='Max presence Days' max='365' min='0' type='number' onChange={handleInputChange} />
                        <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2" type="submit">filter</button>
                    </form>

                    <div>

                        <div class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            {loading?<l-waveform
                                    size="35"
                                    stroke="3.5"
                                    speed="1"
                                    color="black"
                                ></l-waveform>: ''}
                            {apiResponse && <div dangerouslySetInnerHTML={{__html:apiResponse}}/> }
                        </div>
                    </div>


                </div>

    </>
   
  )
}

export default Services
