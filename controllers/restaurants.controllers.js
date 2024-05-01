const { getDetailsApi } = require("../API/getDetailsApi");
const { checkRestaurantsQueries } = require("../models/methods/checkRestaurantsQueries");


exports.getRestaurantById = async (req,res)=>{
    const {id} = req.params;
    const response = await getDetailsApi(id, 'restaurants');
    const restaurantDetails =  response.data;
    
    
    res.json({Details:{
        name: restaurantDetails.name,
        address: restaurantDetails.address,
        description: restaurantDetails.description,
        rating: restaurantDetails.rating,
        reviews_number:{
            total: restaurantDetails.num_reviews,
            count_1: restaurantDetails.rating_histogram.count_1,
            count_2: restaurantDetails.rating_histogram.count_2,
            count_3: restaurantDetails.rating_histogram.count_3,
            count_4: restaurantDetails.rating_histogram.count_4,
            count_5: restaurantDetails.rating_histogram.count_5,
        },
        imageUrl: restaurantDetails.photo.images.original.url
    }})
}
exports.restaurantsQueries = async (req, res)=> {
    const data = await checkRestaurantsQueries(req, res);
    res.json({data: data})
} 
