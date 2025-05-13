import { Request, Response } from "express";
import md5 from "md5";

import User from "../../models/users.model";
import { generateRandomNumber } from "../../helper/generate";
import ForgotPassword from "../../models/forgot-password";
import { sendMail } from "../../helper/sendMell";


// [GET] users/register
export const register = async (req: Request, res: Response) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký"
    })
}

// [POST] users/register
export const registerPost = async (req: Request, res: Response) => {
    try {
        const exitEmail = await User.findOne({
            email: req.body.email,
            deleted: false
        })
        if (exitEmail) {
            req.flash("error", "Email đã tồn tại!!!");
            res.redirect("/users/register");
            return;
        }
        const data = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: md5(req.body.password),
        }
        const user = new User(data);
        await user.save();
        req.flash("success", "Đăng ký thành công");
        res.redirect("/users/register");
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [GET] users/login
export const login = async (req: Request, res: Response) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng Nhập"
    })
}

// [POST] users/login
export const loginPost = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            deleted: false
        })
        if (!user) {
            req.flash("error", "Email không đúng!!!");
            res.redirect("/users/login");
            return;
        }
        if (md5(req.body.password) !== user.password) {
            req.flash("error", "Sai mật khẩu!!!");
            res.redirect("/users/login");
            return;
        }
        if (user.status === "inactive") {
            req.flash("error", "Tài khoản của bạn đang bị khóa");
            res.redirect("/users/login");
            return;
        }

        res.cookie("tokenUser", user.tokenUser);

        req.flash("success", "Đăng nhập thành công");
        res.redirect("/");
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [GET] users/logout
export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("tokenUser");
        req.flash("success", "Đăng xuất thành công");
        res.redirect("/users/login");
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [GET] users/password/forgot
export const forgotPassword = async (req: Request, res: Response) => {
    res.render("client/pages/user/forgot", {
        pageTitle: "Lấy lại mật khẩu"
    })
}

// [POST] users/password/forgot
export const forgotPasswordPost = async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email;
        const user = await User.findOne({
            email: req.body.email,
            deleted: false
        });
        if (!user) {
            req.flash("error", "Email không tồn tại!!!");
            res.redirect("/");
            return;
        }

        const otp: string = generateRandomNumber(6);
        interface ObjectFoget {
            email: string,
            otp: string,
            expireAt: Date
        };
        const objectForgot: ObjectFoget = {
            email: email,
            otp: otp,
            expireAt: new Date(Date.now())
        };
        const forgotPassword = new ForgotPassword(objectForgot);
        await forgotPassword.save();

        //Gửi mã OPT về email
        const subject: string = "Mã OTP xác minh để lấy lại mật khẩu"
        const html: string = `Mã OTP xác minh là <b>${otp}</b> thời hạn là 3 phút.`
        sendMail(email, subject, html);

        res.redirect(`/users/password/otp?email=${email}`)
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect(`/`);
    }
}

// [GET] /users/password/otp
export const otpPassword = async (req: Request, res: Response) => {
    try {
        const email = req.query.email;
        res.render("client/pages/user/otp-password", {
            pageTitle: "Xác thực mã OTP",
            email: email
        })
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [POST] /users/password/otp
export const otpPasswordPost = async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email;
        const otp: string = req.body.otp;

        const forgot = await ForgotPassword.findOne({
            email: email,
            otp: otp
        });
        if (!forgot) {
            req.flash("error", "Mã OTP bị sai hoặc không tồn tại");
            res.redirect("/users/password/forgot");
            return;
        }

        const user = await User.findOne({
            email: email
        });

        res.cookie("tokenUser", user.tokenUser);
        res.redirect("/users/password/reset");
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [GET] /users/password/reset
export const resetPassword = async (req: Request, res: Response) => {
    try {
        res.render("client/pages/user/reset-password", {
            pageTitle: "Thay đổi mật khẩu mới",
        })
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}


// [POST] /users/password/reset
export const resetPasswordPost = async (req: Request, res: Response) => {
    try {
        const password: string = req.body.password;
        const tokenUser: string = req.cookies.tokenUser;

        await User.updateOne({
            tokenUser: tokenUser
        }, {
            password: md5(password)
        });
        req.flash("success", "Thay đổi mật khẩu thành cồng");
        res.redirect("/users/login");
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}