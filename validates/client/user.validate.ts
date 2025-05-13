import { NextFunction, Request, Response } from "express";

export const register = async (req: Request, res: Response, next: NextFunction) =>{
    if(!req.body.fullName){
        req.flash("error", "vui lòng nhập họ tên!!!")
        res.redirect("/users/register");
        return;
    }

    if(!req.body.email){  
        req.flash("error", "vui lòng nhập email!!!")
        res.redirect("/users/register");
        return;
    }

    if(!req.body.password){  
        req.flash("error", "vui lòng nhập Mật khẩu!!!")
        res.redirect("/users/register");
        return;
    }

    next();//hàm nexext để nó đi tiếp
}

export const login = async (req: Request, res: Response, next: NextFunction) =>{
    if(!req.body.email){  
        req.flash("error", "vui lòng nhập email!!!")
        res.redirect("/users/register");
        return;
    }

    if(!req.body.password){  
        req.flash("error", "vui lòng nhập Mật khẩu!!!")
        res.redirect("/users/register");
        return;
    }

    next();//hàm nexext để nó đi tiếp
}

export const forgot = async (req: Request, res: Response, next: NextFunction) =>{
    if(!req.body.email){  
        req.flash("error", "vui lòng nhập email!!!")
        res.redirect("/users/register");
        return;
    }

    next();//hàm nexext để nó đi tiếp
}

export const otpPasswordPost = async (req: Request, res: Response, next: NextFunction) =>{
    if(!req.body.otp){  
        req.flash("error", "vui lòng nhập mã OTP!!!")
        res.redirect("/users/password/otp");
        return;
    }

    next();//hàm nexext để nó đi tiếp
}