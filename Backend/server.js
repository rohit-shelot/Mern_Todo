const express = require('express')
const app = express()
const connectDb = require('./database/Connection.js')
const router = require('./routers/router.js')
const dotenv = require('dotenv').config()
const cors = require('cors')

app.use(express.json())
app.use(cors());
app.use('/',router)

connectDb().then(
    ()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening at Port ${process.env.PORT}`)
        })
    }
).catch(()=>{
    console.error(`Error in Backend Connection`)
})