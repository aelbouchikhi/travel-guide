const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://hamid:hamid12345@travelguidecluster.vjxbebl.mongodb.net/')
.then(()=>{
    console.log("connected successfuly")
}).catch((err)=>{
    console.log("error with connicting with the DB")
});

module.exports = {mongoose};