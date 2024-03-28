const axios = require('axios');
const { getAttractionsData } = require('./attractoinsApi');
const { getHotelsData } = require('./hotelsApi');
const { getResturantsData } = require('./resturantsApi');

exports.fullDataApi = async (req, res) => {
    const address = req.query.search;
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
    const data = response.data;
    const coordinates = data[0].boundingbox;
    // const BL_LAT = data[0].boundingbox[0];
    // const TR_LAT = data[0].boundingbox[1];
    // const BL_LON = data[0].boundingbox[2];
    // const TR_LON = data[0].boundingbox[3];
    

    const resturantsResponseApi = await getResturantsData(coordinates);
    const resturantsData = resturantsResponseApi.data.data;
    const hotelsResponseApi = await getHotelsData(coordinates);
    const hotelsData = hotelsResponseApi.data.data;
    const attractionsResponseApi = await getAttractionsData(coordinates);
    const attractionsData = attractionsResponseApi.data.data;


    res.json({fullDataOfTheCity:{
        Hotels:hotelsData,
        Restaurants: resturantsData,
        Attractions: attractionsData
    }});
}