const axios = require('axios');

exports.getDetailsApi = async(id) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/attractions/get-details',
      params: {
        location_id: id,
        currency: 'USD',
        lang: 'en_US'
      },
      headers: {
        'X-RapidAPI-Key': 'df3e6d2bcemshaa39151811cc1a9p17b3ebjsn798d4b7458b8',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    };
    
    return  await axios.request(options);
  } catch (error) {
    console.error(error.message);
  }
}