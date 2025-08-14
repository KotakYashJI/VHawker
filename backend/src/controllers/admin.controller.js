import jwt from "jsonwebtoken"

export const loginadmin = async (req, res) => {
    try {
        const { usertype } = req.body;
        const usertoken = { usertype: usertype };
        const token = jwt.sign(usertoken, process.env.JWT_TOKEN);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            data: req.body,
            message: "Admin Login"
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}