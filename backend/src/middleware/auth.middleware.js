import jwt from "jsonwebtoken"
import Hawkermodel from "../models/hawker.model.js";
import Semiwholesalermodel from "../models/semiwholesaler.model.js";
import Wholesalermodel from "../models/wholesaler.model.js";

export const authenticateuser = async (req, res, next) => {
    console.log(req);
    console.log("yash");
    next();
}