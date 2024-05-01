const { getAttractionsData } = require("./attractoinsApi");
const { getPlaceCoordinates } = require("./getPlaceCoordinates");
const { getHotelsData } = require("./hotelsApi");
const { getResturantsData } = require("./resturantsApi");

exports.fullDataApi = async (req, res) => {
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
};
