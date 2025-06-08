import placeModel from "../models/placemodel.js";
import fs from "fs"
// Add place
const addPlace = async (req, res) => {


    try {
        // Check if an image is uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        // Get the image filename
        const image_filename = `${req.file.filename}`;

        // Create a new place entry
        const places = new placeModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        // Save to database
        await places.save();
        res.json({ success: true, message: "Place selected successfully" });

    } catch (error) {
        console.error('Error saving place:', error);
        res.status(500).json({ success: false, message: "Error saving place", error: error.message });
    }
};

//all places list
const listPlace=async(req,res)=>{
    try{
        const places=await placeModel.find({});
        res.json({success:true,data:places})
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Error"})
    }

}

//remove place
const removePlace=async(req,res)=>{
    try{
        const place=await placeModel.findById(req.body.id);
        fs.unlink(`uploads/${place.image}`,()=>{})


        await placeModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Place removed"})


    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})



    }

}



export { addPlace,listPlace,removePlace };
