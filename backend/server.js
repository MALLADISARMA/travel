import express from "express"
import cors from "cors"
import {connectDB} from "./config/db.js"
import placeRouter from "./routes/placeRoute.js"
import userRouter from "./routes/userRoute.js"
import  'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//app config
const app=express()
const port=4000
//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//API end point

app.use("/api/place",placeRouter );
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API working")



})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://iitsmemchintu:HcfrDxh9#@cluster0.t4wzh.mongodb.net/?