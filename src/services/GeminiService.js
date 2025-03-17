import axios from "axios";



//USE AXIOS TO FETCH DATA FROM GEMINI API

// API KEY = AIzaSyD9tBP0NaJ6s-vA_qEOwbBtAMu34g1tw9c


'query=WHOareyou'

export const geminiGenerate = async (QUERY) => {
    try{
        const response = await axios.get(`https://simple-gemini.onrender.com/home?query=${QUERY}`)
        return response
    }catch(error){
        console.log(error)
    }
}