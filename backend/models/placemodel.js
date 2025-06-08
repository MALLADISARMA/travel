import mongoose from "mongoose";

const placeSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

const placeModel=mongoose.models.places || mongoose.model("places",placeSchema)
export default placeModel;