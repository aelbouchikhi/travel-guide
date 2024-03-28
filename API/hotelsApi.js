const axios = require('axios');
const { fetchedApi } = require('./fetchedApi');

exports.getHotelsData = async (coordinates) => {
    try {
    const BL_LAT = coordinates[0];
    const TR_LAT = coordinates[1];
    const BL_LON = coordinates[2];
    const TR_LON = coordinates[3];



    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary',
      params: {
        bl_latitude: BL_LAT,
        tr_latitude: TR_LAT,
        bl_longitude: BL_LON,
        tr_longitude: TR_LON,
        limit: '10',
        currency: 'USD',
        lang: 'en_US'
      },
      headers: {
        'X-RapidAPI-Key': 'df3e6d2bcemshaa39151811cc1a9p17b3ebjsn798d4b7458b8',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    };
    
    
        return await axios.request(options);
        
        const listOfData = rapidapiData.data.data;
        console.log(listOfData)
        listOfData.map(el=>{
            if(el.name) console.log(el.name,'--',el.subcategory[0].name);
        })
        res.json({lat: data[0].lat, lon: data[0].lon,data: rapidapiData.data.data})

    } catch (error) {
        console.error(error);
    }

}


