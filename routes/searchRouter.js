const express = require('express');
const { fullDataApi } = require('../API/fullDataApi');
const { getPlacesData } = require('../API/placesApi');
const searchRouter = express.Router()

searchRouter.get('/searchPlace',fullDataApi);


module.exports = searchRouter;