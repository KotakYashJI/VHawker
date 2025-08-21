import jwt from "jsonwebtoken"
import Hawkermodel from "../models/hawker.model.js";
import Semiwholesalermodel from "../models/semiwholesaler.model.js";
import Wholesalermodel from "../models/wholesaler.model.js";

export const authenticateuser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({
        message: "user not authorized please login"
    });
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    const usertype = user.usertype.toLowercase();
    if (usertype === "hawker") {
        const hawkerexist = await Hawkermodel.findOne({
            _id: user.id
        });
        if (!hawkerexist) {
            res.redirect("/#/hawker/login");
        };
    }
    if (usertype === "semiwholesaler") {
        const semiwholesalerexist = await Semiwholesalermodel.findOne({
            _id: user.id
        });
        if (!semiwholesalerexist) {
            res.redirect("/#/semiwholealer/login");
        };
        next();
    }
    else {
        const wholesalerexist = await Wholesalermodel.findOne({
            _id: user.id
        });
        if (!wholesalerexist) {
            res.redirect("/#/wholesaler/login");
        };
        next();
    }
}