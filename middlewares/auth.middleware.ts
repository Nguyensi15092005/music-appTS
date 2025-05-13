import { NextFunction, Request, Response } from "express";
import User from "../models/users.model";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) =>{
    if(!req.cookies.tokenUser){
        res.redirect(`/users/login`);
        return;
    }
    else{
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser
        }).select("-password");

        if(!user){
            res.redirect(`/users/login`);
            return;
        }
        else{
            res.locals.user = user;
            next();
        }
    }
}