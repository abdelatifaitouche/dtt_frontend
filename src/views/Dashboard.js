import React, { useEffect, useState, useContext } from 'react'
import NavBar from '../Components/NavBar'

import AuthContext from '../context/AuthContext'
import axios from 'axios'
import { waveform } from 'ldrs'
import Services from '../Components/Services'
import Redevences from '../Components/Redevences'
import Dividendes from '../Components/Dividendes'
import Intrests from '../Components/Intrests'
import CurrencyCard from '../Components/CurrencyCard'
waveform.register()







function Dashboard() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const API_COUNTRIES = `${apiUrl}countries/`

    
    const [date , setDate] = useState(new Date());

    const [mode, setMode] = useState('view')
    const [data, setData] = useState('')
    const { authTokens } = useContext(AuthContext)
    const [currency, setCurrency] = useState('')
    const [loading, setLoading] = useState(true)

    const handleChange = (event) => {
        const { name, value } = event.target
        setMode(value)
    }

    const getCountries = async () => {
        setLoading(true)
        await axios.get(API_COUNTRIES, {
            headers: {
                Authorization: `Bearer ${authTokens?.access}`
            },

        }).then(response => {
            setData(response.data.Countries)
            setLoading(false)
        })


    }

    const getCurrencies = async () => {
        await axios.get('https://open.er-api.com/v6/latest/DZD').then(response => {
            setCurrency(response.data.rates)
        })
    }


    useEffect(() => {
        getCountries()
        getCurrencies()
    }, [])


  

    function roundN(num, n) {
        return parseFloat(Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
    }

    return (
        <div className='bg-slate-100 h-[100vh]'>
            <NavBar />

            <div class="p-4 sm:ml-64 flex flex-col justify-between h-[100vh]">
                <div>
                    <nav class="flex px-5 py-3 text-white border border-gray-200 rounded-lg bg-purple-600  dark:border-gray-700" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li class="inline-flex items-center">
                                <button onClick={() => setMode('view')} class="inline-flex items-center text-sm font-medium text-white hover:text-blue-600 dark:hover:text-white">
                                    <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    Choose Revenue Type
                                </button>
                            </li>
                            <li>
                                <div class="flex items-center">
                                    <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-white-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <a class="ms-1 text-sm font-medium text-white hover:text-blue-600 md:ms-2 dark:hover:text-white">{mode}</a>
                                </div>
                            </li>

                        </ol>
                    </nav>
                    {mode === 'view' ?

                        <div className=''>
                            <br></br>
                            <form class="max-w-sm mx-auto">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Choose a Revenue Type</h5>
                                {loading ?// Default values shown
                                    <l-waveform
                                        size="35"
                                        stroke="3.5"
                                        speed="1"
                                        color="black"
                                    >

                                    </l-waveform>
                                    
                                    :
                                    
                                    <select onChange={handleChange} id="small" class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a Revenue Type</option>
                                        <option value="Services">Services</option>
                                        <option value="Dividendes">Dividendes</option>
                                        <option value="Intrests">Intrests</option>
                                        <option value="Redevences">Redevences</option>
                                    </select>
                                
                                }


                            </form>


                        </div>
                        
                        :

                        <div>

                        </div>

                    }
                    {mode === 'Services' ? <Services countries={data} /> : <div></div>}
                    {mode === 'Redevences' ? <Redevences countries={data} /> : <div></div>}
                    {mode === 'Dividendes' ? <Dividendes countries={data} /> : <div></div>}
                    {mode === 'Intrests' ? <Intrests countries={data} /> : <div></div>}


                </div>

                {
                    mode == 'view'?  <div>
                        <div className='flex flex-col items-center mb-3'>
                            <p className='text-md font-bold text-gray-800'>Exchange rate on</p>
                            <p className='text-xs text-gray-500'>{date.toDateString()}</p>
                        </div>
                        <div className='flex gap-3 justify-center'>
                            <CurrencyCard currency={"USD"} currencyData={roundN(1 / currency['USD'], 2)} />
                            <CurrencyCard currency={"EUR"} currencyData={roundN(1 / currency['EUR'], 2)} />
                            <CurrencyCard currency={"GBP"} currencyData={roundN(1 / currency['GBP'], 2)} />
                            <CurrencyCard currency={"CAD"} currencyData={roundN(1 / currency['CAD'], 2)} />
                        </div>
                        <div className='flex flex-col items-center justify-center mt-3'>
                            <p className='text-xs font-bold text-gray-500'>Disclaimer</p>
                            <p className='text-xs text-gray-500'>Data from API may not be 100% accurate</p>
                        </div>

                    </div> : ""

                }
               


            </div>



        </div>
    )
}

export default Dashboard


