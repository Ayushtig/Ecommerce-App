import express from "express"
import colors from "colors"
import  dotenv  from "dotenv"
import connectDB from "./config/db.js"
import morgan from "morgan"
import authRoutes from "./routes/authRoute.js"
import cors from "cors"
import categoryRoutes from "./routes/categoryRoute.js"
import productRoutes from "./routes/productRoute.js"
import {fileURLToPath} from 'url'
import path from 'path'

//configuration env
dotenv.config()

//database config
connectDB()

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
//rest object
const app=express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)

//rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//PORT
const PORT= process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.bgGreen.white)
})
