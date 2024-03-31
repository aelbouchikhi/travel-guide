const { getAttractionsData } = require("../../API/attractoinsApi");
const { getPlaceCoordinates } = require("../../API/getPlaceCoordinates");
const { getPlaceData } = require("../../API/getPlaceDataApi");

exports.checkQueries =  async (req, res) => {
    const query = req.query;

    //get all data
    if(Object.keys(query).length == 1 && query.hasOwnProperty('location')) {
        console.log('am her '); 
        const location = req.query.location;
        const coordinatesOfLoaction = await getPlaceCoordinates(location);
        const response = await getPlaceData(coordinatesOfLoaction, 'attractions');
        const attractions = response.data.data;
        console.log(attractions)
        res.json({attractions: attractions})
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