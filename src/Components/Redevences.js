import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { waveform } from 'ldrs';
waveform.register();

function Redevences({ countries }) {
    const [countryID, setCountryId] = useState(0);
    const [apiResponse, setApiResponse] = useState([]);
    const { authTokens } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;

    function handleInputChange(event) {
        const { name, value } = event.target;
        setCountryId(value);
    }

    const getRedevences = (e) => {
        e.preventDefault();
        setLoading(true);
        axios({
            method: "GET",
            url: `${apiUrl}redevences/${countryID}`,
            headers: {
                Authorization: `Bearer ${authTokens.access}`,
            },
        }).then((response) => {
            console.log(response.data.country_conditions);
            setApiResponse(response.data.country_conditions);
            setLoading(false);
        });
    };

    return (
        <>
            <div className="dashboard p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-xl dark:text-white">
                    Please, select a <span className="text-purple-600 dark:text-blue-500">Country</span> To learn more
                </h1>
                <form onSubmit={getRedevences} className="flex flex-col sm:flex-row items-center justify-center gap-2 my-7">
                    <select
                        onChange={handleInputChange}
                        options={countries}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-auto sm:max-w-xs p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="country_id"
                    >
                        <option defaultValue>Select Country</option>
                        {countries.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.country_name}
                            </option>
                        ))}
                    </select>
                    <button
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center sm:ml-2 mt-3 sm:mt-0"
                        type="submit"
                    >
                        Filter
                    </button>
                </form>

                <div>
                    {loading ? (
                        <l-waveform size="35" stroke="3.5" speed="1" color="black"></l-waveform>
                    ) : (
                        ''
                    )}
                    {Array.isArray(apiResponse) &&
                        apiResponse.map((e, index) => (
                            <div key={index} className="flex flex-col sm:flex-row justify-start gap-4 sm:gap-6 mb-6">
                                <div className="flex flex-col items-center justify-center w-full sm:w-1/5 p-6 bg-white border border-gray-200 rounded-lg shadow">
                                    <h2 className="text-md font-normal text-gray-500 dark:text-gray-400">Rate</h2>
                                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-500 from-purple-800">
                                            {e.taux}%
                                        </span>
                                    </h1>
                                </div>
                                <div className="w-full sm:w-2/3 p-6 bg-white border border-gray-200 rounded-lg shadow">
                                    <p className="text-md font-normal text-gray-500 dark:text-gray-400">Condition:</p>
                                    <p className="mb-4 text-xl font-bold text-gray-600 dark:text-white md:text-2xl lg:text-xl">
                                        {e.condition}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default Redevences;
