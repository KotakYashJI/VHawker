import jwt from "jsonwebtoken"
import Hawkermodel from "../models/hawker.model.js";
import Semiwholesalermodel from "../models/semiwholesaler.model.js";
import Wholesalermodel from "../models/wholesaler.model.js";

export const authenticateuser = async (req, res, next) => {
    const token = req.cookies.token;
    let loginuser;
    if (!token) return res.status(400).json({
        message: "user not authorized please login"
    });
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    const usertype = user.usertype;
    if (usertype === "Hawker") {
        loginuser = await Hawkermodel.findOne({ _id: user.id });
    }
    else if (usertype === "Semiwholesaler") {
        loginuser = await Semiwholesalermodel.findOne({ _id: user.id });
    }
    else {
        loginuser = await Wholesalermodel.findOne({ _id: user.id });
    }
    if (!loginuser) return res.status(404).json({
        message: "User not found",
    });
    next();
}