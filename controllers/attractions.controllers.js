const express = require('express');
const { getAttractionsData } = require('../API/attractoinsApi');
const { getPlaceCoordinates } = require('../API/getPlaceCoordinates');

exports.getAllAttractions = async (req,res)=>{
    const location = req.query.location;
    console.log(location)
    const coordinatesOfLoaction = await getPlaceCoordinates(location);
    const response = await getAttractionsData(coordinatesOfLoaction);
    const attractions = response.data.data;
    res.json({attractions: attractions})
}
exports.getAttractionsById = (req,res)=>{
    const attractionId = req.params.id;
    res.send("the Id is"+ attractionId);
}
exports.getAttractionsCategories = async (req,res)=>{
    const location = req.query.location;
    console.log(location)
    const coordinatesOfLoaction = await getPlaceCoordinates(location);
    const response = await getAttractionsData(coordinatesOfLoaction);
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