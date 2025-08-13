import jwt from "jsonwebtoken"

export const authenticateuser = async(req,res)=>{
    const token = req.cookies.token;
    console.log(token);
}