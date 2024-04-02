const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://yassinetaji:yspXGASky1VWq4QL@travel-guide.kc894dn.mongodb.net/')
    .then(() => {
        console.log("connected to DB successfuly")
    }).catch((err) => {
        console.log("error with connicting with the DB")
    });

module.exports = { mongoose };