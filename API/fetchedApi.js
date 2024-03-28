const axios = require('axios');

exports.fetchedApi = async (req, res, type) => {
    const address = req.query.search;
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
    const data = response.data;
    const coordinates = data[0].boundingbox;


    const options = {
        method: 'GET',
        url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        params: {
          bl_latitude: BL_LAT,
          tr_latitude: TR_LAT,
          bl_longitude: BL_LON,
          tr_longitude: TR_LON,
          limit: '30',
          currency: 'USD',
          lang: 'en_US'
        },
        headers: {
          'X-RapidAPI-Key': 'df3e6d2bcemshaa39151811cc1a9p17b3ebjsn798d4b7458b8',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      };
      return await axios.request(options);
}