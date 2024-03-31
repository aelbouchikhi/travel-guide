
exports.getAllAttractions = (req,res)=>{
    res.json("done");
}
exports.getAttractionsById = (req,res)=>{
    const attractionId = req.params.id;
    res.send("the Id is"+ attractionId);
}
exports.createAttraction = (req,res)=>{
    const newattracion = req.body;
    res.json("this creatAttraction" + newattracion);
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