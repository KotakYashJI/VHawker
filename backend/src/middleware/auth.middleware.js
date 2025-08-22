import jwt from "jsonwebtoken"
import Hawkermodel from "../models/hawker.model.js";
import Semiwholesalermodel from "../models/semiwholesaler.model.js";
import Wholesalermodel from "../models/wholesaler.model.js";

export const authenticateuser = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) res.status(400).json({
        message: "user not authorized please login"
    });
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    const usertype = user.usertype;

    if (usertype === "Hawker") {
        const hawkerexist = await Hawkermodel.findOne({
            _id: user.id
        });
        if (!hawkerexist) return res.status(404).json({
            message: "User not found!"
        });
        res.status(200).json({
            message: "User Found",
            hawkerexist
        });
        next();
    }
    if (usertype === "Semiwholesaler") {
        const semiwholesalerexist = await Semiwholesalermodel.findOne({
            _id: user.id
        });
        if (!semiwholesalerexist) return res.status(404).json({
            message: "User not found!"
        });
        res.status(200).json({
            message: "User Found",
            semiwholesalerexist
        });
        next();
    }
    else {
        const wholesalerexist = await Wholesalermodel.findOne({
            _id: user.id
        });
        if (!wholesalerexist) return res.status(404).json({
            message: "User not found!"
        });
        res.status(200).json({
            message: "User Found",
            wholesalerexist
        });
        next();
    }
}