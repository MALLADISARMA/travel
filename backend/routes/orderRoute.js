import express from "express"
import authMiddleware from "../middleware/auth.js"
import { deleteOrder, listOrders, placeOrder, updateStatus, userbookings,  verifyOrder } from "../controllers/orderController.js"

const orderRouter=express.Router();
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userbookings",authMiddleware,userbookings);
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)
orderRouter.post("/delete",deleteOrder); // No auth needed for admin


export default orderRouter;
