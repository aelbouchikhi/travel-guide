const { getDetailsApi } = require("../API/getDetailsApi");
const { checkHotelsQueries } = require("../models/methods/checkHotelsQueries")

exports.getHotelById = async (req, res) => {
    const {id} = req.params;
    const response = await getDetailsApi(id, 'hotels');
    const hotelDetails =  response.data.data;
      
    res.json({Details: hotelDetails.length > 0 ? {
        name: hotelDetails.name,
        address: hotelDetails.address,
        description: hotelDetails.description,
        rating: hotelDetails.rating,
        imageUrl: hotelDetails.photo.images.original.url
    }: "can't fetch hotel details from api right now"})
}
exports.hotelsQueries = async (req, res)=> {
    const data = await checkHotelsQueries(req, res);
    res.json({data: data})
}