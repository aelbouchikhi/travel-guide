const express = require('express');
const { fullDataApi } = require('../API/fullDataApi');
const { getDetailsApi } = require('../API/getDetailsApi');
const { getPlace, getAllDataOfplace, getPhotosByLocationId } = require('../controllers/places.controller');

const router = express.Router()


router.get('/search',getPlace)
router.get('/search/all',getAllDataOfplace)
router.get('/photos/:id',getPhotosByLocationId)


module.exports = router;