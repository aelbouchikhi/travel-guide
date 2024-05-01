const { getAttractionsData } = require("../../API/attractoinsApi");
const { getPlaceCoordinates } = require("../../API/getPlaceCoordinates");
const { getPlaceData } = require("../../API/getPlaceDataApi");
const { getHotelsData } = require("../../API/hotelsApi");
const { getResturantsData } = require("../../API/resturantsApi");

exports.checkHotelsQueries =  async (req, res) => {
    const query = req.query;

    //get all data
    if(Object.keys(query).length == 1 && query.hasOwnProperty('location')) {
        const location = req.query.location;
        const coordinatesOfLoaction = await getPlaceCoordinates(location);
        const response = await getPlaceData(coordinatesOfLoaction,'hotels');
        const hotels = response.data;
        return hotels.length > 0? hotels: "can't fetch hotels from api right now";
    }
    //filtering by category
    else if(query.hasOwnProperty('location') && query.hasOwnProperty('category')){
        const coordinatesOfLoaction = await getPlaceCoordinates(req.query.location);
        const response = await getAttractionsData(coordinatesOfLoaction);
        const attractions = response.data.data
        const attractionsFilteredByCategory = attractions.filter(el=>el.name && el.subcategory[0].name == query.category)
        
         return attractionsFilteredByCategory;
    }



}