const { searchPlaceApi } = require("../API/searchPlaceApi")
const { getAttractionsData } = require("../API/attractoinsApi");
const { getPlaceCoordinates } = require("../API/getPlaceCoordinates");
const { getHotelsData } = require("../API/hotelsApi");
const { getResturantsData } = require("../API/resturantsApi");
const { getPhotosApi } = require("../API/getPhotosApi");

exports.getPlace = async (req, res) => {
    const response = await searchPlaceApi(req.query.q, 1);
    const placeInfo = response.data.data[0].result_object;

    res.json({data: {
        location_id: placeInfo.location_id,
        city: placeInfo.name,
        region: placeInfo.ancestors[0].name,
        description: placeInfo.geo_description,
        imageUrl: placeInfo.photo.images.original.url
        
     }
    })
}

exports.getAllDataOfplace = async (req, res) => {
    const location = req.query.q;
    const coordinatesOfLoaction = await getPlaceCoordinates(location);
  
    const resturantsResponseApi = await getResturantsData(coordinatesOfLoaction);
    const resturantsData = resturantsResponseApi.data.data;
    const hotelsResponseApi = await getHotelsData(coordinatesOfLoaction);
    const hotelsData = hotelsResponseApi.data.data;
    const attractionsResponseApi = await getAttractionsData(
      coordinatesOfLoaction
    );
    const attractionsData = attractionsResponseApi.data.data;
  
    res.json({
      fullDataOfTheCity: {
        Hotels: hotelsData,
        Restaurants: resturantsData,
        Attractions: attractionsData,
      },
    });
}

exports.getPhotosByLocationId = async (req, res) => {
    const {id} = req.params;
    const response = await getPhotosApi(id);
    const data = response.data.data;
    const photos = [];
    data.forEach(el => {
      photos.push(el.images.original.url)
    })
    res.json({photos: photos});
} 