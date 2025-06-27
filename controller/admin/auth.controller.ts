import { Request, Response } from "express";
import { systemConfig } from "../../config/config";

export const login = async (req: Request, res: Response) =>{
    try {
        res.send("ok")
        // res.render("admin/pages/auth/login", {
        //     pageTitle: "Đăng nhập"
        // })
    } catch (error) {
        req.flash("error", "lỗi");
        res.redirect(systemConfig.prefixAdmin + "/dashboard")
    }
}