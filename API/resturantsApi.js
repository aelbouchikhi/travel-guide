const axios = require("axios");
const { server } = require("../config/all.config");

exports.getResturantsData = async (coordinates) => {
  try {
    const BL_LAT = coordinates[0];
    const TR_LAT = coordinates[1];
    const BL_LON = coordinates[2];
    const TR_LON = coordinates[3];

    const options = {
      method: "GET",
      url: "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary",
      params: {
        bl_latitude: BL_LAT,
        tr_latitude: TR_LAT,
        bl_longitude: BL_LON,
        tr_longitude: TR_LON,
        limit: "10",
        currency: "USD",
        lang: "en_US",
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
};
