const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log(`Database is Successfully Connected`)
        
    } catch (error) {
        console.error(error.message)
    }
}
module.exports = ConnectDB