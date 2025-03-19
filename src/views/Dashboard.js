import React, { useEffect, useState, useContext } from 'react';
import NavBar from '../Components/NavBar';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { waveform } from 'ldrs';
import Services from '../Components/Services';
import Redevences from '../Components/Redevences';
import Dividendes from '../Components/Dividendes';
import Intrests from '../Components/Intrests';
import CurrencyCard from '../Components/CurrencyCard';
waveform.register();

function Dashboard() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const API_COUNTRIES = `${apiUrl}countries/`;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('view');
    const [data, setData] = useState('');
    const { authTokens } = useContext(AuthContext);
    const [currency, setCurrency] = useState('');
    const [loading, setLoading] = useState(true);

    const handleChange = (event) => {
        setMode(event.target.value);
    };

    const getCountries = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_COUNTRIES, {
                headers: { Authorization: `Bearer ${authTokens?.access}` }
            });
            setData(response.data.Countries);
        } catch (error) {
            console.error("Failed to fetch countries", error);
        }
        setLoading(false);
    };

    const getCurrencies = async () => {
        try {
            const response = await axios.get('https://open.er-api.com/v6/latest/DZD');
            setCurrency(response.data.rates);
        } catch (error) {
            console.error("Failed to fetch currency exchange rates", error);
        }
    };

    useEffect(() => {
        getCountries();
        getCurrencies();
    }, []);

    function roundN(num, n) {
        return parseFloat((Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n));
    }

    return (
        <div className='bg-slate-100 min-h-screen'>
            <NavBar />
            <div className="p-4 sm:ml-64 flex flex-col justify-between min-h-screen">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white p-8 rounded-lg shadow-lg mb-6 text-center">
                    <h1 className="text-3xl font-bold">Your Tax Compliance Assistant</h1>
                    <p className="mt-2 text-lg">Easily manage tax regulations, revenue streams, and exchange rates.</p>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="p-4 bg-white rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-bold">Up-to-Date Tax Laws</h2>
                        <p className="text-gray-600 mt-2">Access the latest double taxation treaties and regulations.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-bold">Real-Time Exchange Rates</h2>
                        <p className="text-gray-600 mt-2">Accurate and live currency conversion data at your fingertips.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-bold">AI-Powered Tax Advisory</h2>
                        <p className="text-gray-600 mt-2">Leverage AI for smart insights into tax and finance regulations.</p>
                    </div>
                </div>

                {/* Revenue Type Selection */}
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Select a Revenue Type</h5>
                    {loading ? (
                        <l-waveform size="35" stroke="3.5" speed="1" color="black" />
                    ) : (
                        <select onChange={handleChange} className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white shadow-md focus:ring-purple-500 focus:border-purple-500">
                            <option value="view">Choose Revenue Type</option>
                            <option value="Services">Services</option>
                            <option value="Dividendes">Dividendes</option>
                            <option value="Intrests">Interests</option>
                            <option value="Redevences">Royalties</option>
                        </select>
                    )}
                </div>

                {/* Revenue Type Sections */}
                {mode === 'Services' && <Services countries={data} />}
                {mode === 'Redevences' && <Redevences countries={data} />}
                {mode === 'Dividendes' && <Dividendes countries={data} />}
                {mode === 'Intrests' && <Intrests countries={data} />}

                {/* Exchange Rate Section */}
                {mode === 'view' && (
                    <div>
                        <div className="flex flex-col items-center mb-3">
                            <p className="text-md font-bold text-gray-800">Exchange Rate Data</p>
                            <p className="text-xs text-gray-500">Updated: {date.toDateString()}</p>
                        </div>
                        <div className="flex gap-3 justify-center flex-wrap">
                            <CurrencyCard currency="USD" currencyData={roundN(1 / currency['USD'], 2)} />
                            <CurrencyCard currency="EUR" currencyData={roundN(1 / currency['EUR'], 2)} />
                            <CurrencyCard currency="GBP" currencyData={roundN(1 / currency['GBP'], 2)} />
                            <CurrencyCard currency="CAD" currencyData={roundN(1 / currency['CAD'], 2)} />
                        </div>
                        <div className="flex flex-col items-center justify-center mt-3">
                            <p className="text-xs font-bold text-gray-500">Disclaimer</p>
                            <p className="text-xs text-gray-500">Exchange rate data may vary slightly from official sources.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
