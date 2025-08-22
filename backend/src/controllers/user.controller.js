import Hawkermodel from "../models/hawker.model.js"
import Semiwholesalermodel from "../models/semiwholesaler.model.js";
import Wholesalermodel from "../models/wholesaler.model.js"
import jwt from "jsonwebtoken";

export const loadloginuser = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("User Not Authenticated please login");
    try {
        const user = jwt.verify(token, process.env.JWT_TOKEN);
        const usertype = user.usertype;

        if (usertype === "Hawker") {
            const hawker = await Hawkermodel.findOne({
                _id: user.id
            });
            if (!hawker) return res.status(400).json({ message: "User Not Found!" });
            res.status(200).json({
                message: "Login User Found",
                user: hawker,
                toke: user
            });
        }
        else if (usertype === "Semiwholesaler") {
            const semiwholesaler = await Semiwholesalermodel.findOne({
                _id: user.id
            });
            if (!semiwholesaler) return res.status(400).json({ message: "User Not Found!" });
            res.status(200).json({
                message: "Login User Found",
                user: semiwholesaler
            });
        }
        else if (usertype === "Wholesaler") {
            const wholesaler = await Wholesalermodel.findOne({
                _id: user.id
            });
            if (!wholesaler) return res.status(400).json({ message: "User Not Found!" });
            res.status(200).json({
                message: "Login User Found",
                user: wholesaler
            });
        }
    } catch (error) {
        res.status(500).json(error);
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