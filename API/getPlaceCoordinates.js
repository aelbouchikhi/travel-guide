const axios = require('axios');

exports.getPlaceCoordinates = async (location) => {
    const response =  await axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`);
    const data = response.data;
    const coordinatesOfLoaction = data[0].boundingbox;
    return coordinatesOfLoaction;
}