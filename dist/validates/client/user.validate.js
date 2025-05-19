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
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpPasswordPost = exports.forgot = exports.login = exports.register = void 0;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.fullName) {
        req.flash("error", "vui lòng nhập họ tên!!!");
        res.redirect("/users/register");
        return;
    }
    if (!req.body.email) {
        req.flash("error", "vui lòng nhập email!!!");
        res.redirect("/users/register");
        return;
    }
    if (!req.body.password) {
        req.flash("error", "vui lòng nhập Mật khẩu!!!");
        res.redirect("/users/register");
        return;
    }
    next();
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        req.flash("error", "vui lòng nhập email!!!");
        res.redirect("/users/register");
        return;
    }
    if (!req.body.password) {
        req.flash("error", "vui lòng nhập Mật khẩu!!!");
        res.redirect("/users/register");
        return;
    }
    next();
});
exports.login = login;
const forgot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        req.flash("error", "vui lòng nhập email!!!");
        res.redirect("/users/register");
        return;
    }
    next();
});
exports.forgot = forgot;
const otpPasswordPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.otp) {
        req.flash("error", "vui lòng nhập mã OTP!!!");
        res.redirect("/users/password/otp");
        return;
    }
    next();
});
exports.otpPasswordPost = otpPasswordPost;
