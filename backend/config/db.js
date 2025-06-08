import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://sarma:9505@cluster0.pzm1h.mongodb.net/tour').then(()=>console.log("DB connected"));
}
//mongodb+srv://sarma:9505@cluster0.pzm1h.mongodb.net/?