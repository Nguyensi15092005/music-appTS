import User from "../models/users.model";
import { NextFunction, Request, Response } from "express";

export const infuUser = async (req: Request, res: Response, next: NextFunction) => {
    if(req.cookies.tokenUser){
        
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false,
            status: "active"
        }).select("-password");
        if (user) {
            res.locals.user = user;
        }
    }
    next();
}