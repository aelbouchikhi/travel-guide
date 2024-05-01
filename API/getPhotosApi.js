const axios = require('axios');
const { server } = require('../config/all.config');

exports.getPhotosApi = async (id) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/photos/list',
            params: {
            location_id: id,
            currency: 'USD',
            limit: '50',
            lang: 'en_US'
            },
            headers: {
                'X-RapidAPI-Key': server.API_KEY,
                'X-RapidAPI-Host': server.API_HOST,
            }
        };
      
      
        return await axios.request(options);
      } catch (error) {
          console.error(error);
      }
}