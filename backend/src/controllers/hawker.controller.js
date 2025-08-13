import Hawkermodel from "../models/hawker.model.js";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

export const registerhawker = async (req, res) => {
    try {
        const { username, email, password, city } = req.body;
        const user = await Hawkermodel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });
        if (user) return res.status(400).json("Hawker Already exist");
        const hashpassword = await bcryptjs.hash(password, 10);
        const newuser = await Hawkermodel.create({
            username: username,
            email: email,
            password: hashpassword,
            city: city
        });
        const usertoken = { id: newuser._id, usertype: "hawker" };
        const token = jwt.sign(usertoken, process.env.JWT_TOKEN);
        res.cookie("token", token);
        res.status(201).json({
            message: "User Register",
            newuser
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

export const loginhawker = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Hawkermodel.findOne({
            email: email
        }
        );
        if (!user) return res.status(400).json({ message: "User Not Found" });
        const isexistpassword = await bcryptjs.compare(password, user.password);
        if (!isexistpassword) return res.status(400).json({
            message: "Invalid Password"
        })
        const usertoken = { id: user._id, usertype: user.usertype };
        const token = jwt.sign(usertoken, process.env.JWT_TOKEN);
        res.cookie("token", token);
        res.status(200).json({
            message: "User Login",
            user
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getallhawkers = async (req, res) => {
    try {
        const hawkers = await Hawkermodel.find();
        res.status(200).json(hawkers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const updatehawker = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, password,
            usertype, productstore } = req.body;
        const updatedhawker = await Hawkermodel.findOneAndUpdate(
            { _id: id },
            {
                username: username,
                email: email,
                password: password,
                usertype: usertype,
                productstore: productstore,
            }
        )
        res.status(201).json({
            message: "Hawker Updated",
            data: updatedhawker
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}