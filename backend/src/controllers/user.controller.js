import Hawkermodel from "../models/hawker.model.js"
import Semiwholesalermodel from "../models/semiwholesaler.model.js";
import Wholesalermodel from "../models/wholesaler.model.js"
import jwt from "jsonwebtoken";

export const loadloginuser = async (req, res) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.JWT_TOKEN);
        const usertype = user.usertype;
        let loginuser;
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
        res.status(200).json({
            message: "Login user found",
            loginuser
        })
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

export const logoutuser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/"
        });
        res.status(200).json({
            message: "User Logout Successfully"
        })
    } catch (error) {
        res.status(500).json(error);
    }
}