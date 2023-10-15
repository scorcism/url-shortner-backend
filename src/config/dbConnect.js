const mongoose = require('mongoose')


const connectToMongo = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Connected to db")
    })
    .catch((error)=>{
        console.log("ERROR!!!!!: ", error)
    })
}

module.exports = connectToMongo;