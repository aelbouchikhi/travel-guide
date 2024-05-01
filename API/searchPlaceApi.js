const axios = require('axios');
const { server } = require('../config/all.config');

exports.searchPlaceApi = async (placeName, limit) => { 
    try {
        const options = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/locations/search',
            params: {
                query: placeName,
                limit: limit,
            },
            headers: {
                'X-RapidAPI-Key': server.API_KEY,
                'X-RapidAPI-Host': server.API_HOST,
            }
        };

        return await axios.request(options);
        
    } catch (error) {
        console.error(error.message);
    }
}