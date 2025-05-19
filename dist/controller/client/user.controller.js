"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordPost = exports.resetPassword = exports.otpPasswordPost = exports.otpPassword = exports.forgotPasswordPost = exports.forgotPassword = exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const users_model_1 = __importDefault(require("../../models/users.model"));
const generate_1 = require("../../helper/generate");
const forgot_password_1 = __importDefault(require("../../models/forgot-password"));
const sendMell_1 = require("../../helper/sendMell");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký"
    });
});
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exitEmail = yield users_model_1.default.findOne({
            email: req.body.email,
            deleted: false
        });
        if (exitEmail) {
            req.flash("error", "Email đã tồn tại!!!");
            res.redirect("/users/register");
            return;
        }
        const data = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: (0, md5_1.default)(req.body.password),
        };
        const user = new users_model_1.default(data);
        yield user.save();
        req.flash("success", "Đăng ký thành công");
        res.redirect("/users/register");
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.registerPost = registerPost;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng Nhập"
    });
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.default.findOne({
            email: req.body.email,
            deleted: false
        });
        if (!user) {
            req.flash("error", "Email không đúng!!!");
            res.redirect("/users/login");
            return;
        }
        if ((0, md5_1.default)(req.body.password) !== user.password) {
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
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.loginPost = loginPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("tokenUser");
        req.flash("success", "Đăng xuất thành công");
        res.redirect("/users/login");
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/forgot", {
        pageTitle: "Lấy lại mật khẩu"
    });
});
exports.forgotPassword = forgotPassword;
const forgotPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield users_model_1.default.findOne({
            email: req.body.email,
            deleted: false
        });
        if (!user) {
            req.flash("error", "Email không tồn tại!!!");
            res.redirect("/");
            return;
        }
        const otp = (0, generate_1.generateRandomNumber)(6);
        ;
        const objectForgot = {
            email: email,
            otp: otp,
            expireAt: new Date(Date.now())
        };
        const forgotPassword = new forgot_password_1.default(objectForgot);
        yield forgotPassword.save();
        const subject = "Mã OTP xác minh để lấy lại mật khẩu";
        const html = `Mã OTP xác minh là <b>${otp}</b> thời hạn là 3 phút.`;
        (0, sendMell_1.sendMail)(email, subject, html);
        res.redirect(`/users/password/otp?email=${email}`);
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect(`/`);
    }
});
exports.forgotPasswordPost = forgotPasswordPost;
const otpPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        res.render("client/pages/user/otp-password", {
            pageTitle: "Xác thực mã OTP",
            email: email
        });
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.otpPassword = otpPassword;
const otpPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const otp = req.body.otp;
        const forgot = yield forgot_password_1.default.findOne({
            email: email,
            otp: otp
        });
        if (!forgot) {
            req.flash("error", "Mã OTP bị sai hoặc không tồn tại");
            res.redirect("/users/password/forgot");
            return;
        }
        const user = yield users_model_1.default.findOne({
            email: email
        });
        res.cookie("tokenUser", user.tokenUser);
        res.redirect("/users/password/reset");
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.otpPasswordPost = otpPasswordPost;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("client/pages/user/reset-password", {
            pageTitle: "Thay đổi mật khẩu mới",
        });
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.resetPassword = resetPassword;
const resetPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = req.body.password;
        const tokenUser = req.cookies.tokenUser;
        yield users_model_1.default.updateOne({
            tokenUser: tokenUser
        }, {
            password: (0, md5_1.default)(password)
        });
        req.flash("success", "Thay đổi mật khẩu thành cồng");
        res.redirect("/users/login");
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.resetPasswordPost = resetPasswordPost;
