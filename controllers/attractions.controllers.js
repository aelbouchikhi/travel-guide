const express = require('express');
const { getAttractionsData } = require('../API/attractoinsApi');
const { getDetailsApi } = require('../API/getDetailsApi');
const { getPlaceCoordinates } = require('../API/getPlaceCoordinates');
const { getPlaceData } = require('../API/getPlaceDataApi');
const { checkQueries } = require('../models/methods/checkQueries');

// exports.getAllAttractions = async (req,res)=>{
//     const location = req.query.location;
//     console.log(location)
//     const coordinatesOfLoaction = await getPlaceCoordinates(location);
//     const response = await getPlaceData(coordinatesOfLoaction,'attractions');
//     const attractions = response.data.data;
//     res.json({attractions: attractions})
// } 
exports.attractionsQueries = async (req, res)=> {
    const data = await checkQueries(req, res)
    res.json({data: data})
}

exports.getAttractionsById = async (req,res)=>{
    const {id} = req.params;
    const response = await getDetailsApi(id);
    const attractionDetails =  response.data;

    res.json({Details:{
        name: attractionDetails.name,
        address: attractionDetails.address,
        description: attractionDetails.description,
        category: attractionDetails.subcategory[0].name,
        rating: attractionDetails.rating,
        reviews_number:{
            total: attractionDetails.num_reviews,
            count_1: attractionDetails.rating_histogram.count_1,
            count_2: attractionDetails.rating_histogram.count_2,
            count_3: attractionDetails.rating_histogram.count_3,
            count_4: attractionDetails.rating_histogram.count_4,
            count_5: attractionDetails.rating_histogram.count_5,
        }
    }})
}
exports.getAttractionsCategories = async (req,res)=>{
    const location = req.query.location;
    const coordinatesOfLoaction = await getPlaceCoordinates(location);
    const response = await getPlaceData(coordinatesOfLoaction,'attractions');
    const attractions = response.data;
  
    const categories = [];
     attractions.data.forEach((el) => {
         if(el.name && !categories.includes(el.subcategory[0].name)) categories.push(el.subcategory[0].name);
      });

    res.json({AttractionsCategories: categories})
}


exports.updateAttraction = (req,res)=>{
    const id = req.params.id;
    res.json("this is update by id"+ id)
}
exports.deleteAttraction = (req,res)=>{
    const deleteById = req.params.id
    res.json("delete Succfuly" + deleteById);
}
exports.searchAttractions = (req,res)=>{
    const searchquery = req.query.q
    res.json("this is your search"+ searchquery)
}
exports.getNearbyAttractions = (req,res) => {
    const latitude = req.query.lat;
    const longitude = req.query.long;
    res.json("this is your location"+ latitude + longitude)
}

