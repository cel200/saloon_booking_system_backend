const mongoose = require('mongoose')
const connectDb = async ()=>{
try {
   await mongoose.connect (process.env.MONGODB_URL) ;
   console.log("mongodb connected")
} catch (error) {
    console.log("error",error)
}
}
module.exports = connectDb