import express from "express";
import { addPlace,listPlace,removePlace } from "../controllers/placeController.js";
import multer from "multer";

const placeRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Directory where images will be stored
    },
    filename: (req, file, cb) => {
        // Ensure the filename is unique
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// POST route for adding a place with image
// Ensure that upload middleware is used before your controller function
placeRouter.post("/add", upload.single("image"), addPlace);
placeRouter.get("/list",listPlace)
placeRouter.post("/remove",removePlace)




export default placeRouter;
