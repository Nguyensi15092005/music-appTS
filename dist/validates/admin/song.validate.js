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
exports.createSong = void 0;
const config_1 = require("../../config/config");
const createSong = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title) {
        req.flash("error", "vui lòng nhập Tiêu đề bài hát!!!");
        res.redirect(config_1.systemConfig.prefixAdmin + "/songs/create");
        return;
    }
    if (!req.body.topicId) {
        req.flash("error", "vui lòng chọn chủ đề bài hát!!!");
        res.redirect(config_1.systemConfig.prefixAdmin + "/songs/create");
        return;
    }
    if (!req.body.singerId) {
        req.flash("error", "vui lòng chọn ca sĩ!!!");
        res.redirect(config_1.systemConfig.prefixAdmin + "/songs/create");
        return;
    }
    next();
});
exports.createSong = createSong;
