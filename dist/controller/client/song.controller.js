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
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const users_model_1 = __importDefault(require("../../models/users.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topic = yield topic_model_1.default.findOne({
            slug: req.params.slugTopic,
            status: "active",
            deleted: false
        });
        const songs = yield song_model_1.default.find({
            topicId: topic.id,
            status: "active",
            deleted: false
        }).select("avatar title slug singerId like");
        for (const song of songs) {
            const infoSinger = yield singer_model_1.default.findOne({
                _id: song.singerId,
                status: "active",
                deleted: false
            });
            song["infoSinger"] = infoSinger;
            song["countLike"] = song.like.length;
        }
        res.render("client/pages/songs/list.pug", {
            pageTitle: topic.title,
            songs: songs
        });
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        const tokenUser = req.cookies.tokenUser;
        const user = yield users_model_1.default.findOne({
            tokenUser: tokenUser,
            deleted: false
        });
        const song = yield song_model_1.default.findOne({
            slug: slugSong,
            deleted: false,
            status: "active"
        });
        if (user) {
            song["isLikeSong"] = song.like.includes(user.id) ? true : false;
            const favorite = yield favorite_song_model_1.default.findOne({
                userId: user.id,
                songId: song.id,
            });
            song["isFavoriteSong"] = favorite ? true : false;
        }
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active"
        }).select("fullName");
        const topic = yield topic_model_1.default.findOne({
            _id: song.topicId,
            deleted: false
        }).select("title");
        res.render("client/pages/songs/detail", {
            pageTitle: song.title,
            song: song,
            singer: singer,
            topic: topic,
        });
    }
    catch (error) {
        console.log(error);
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeLike = req.params.typeLike;
        const idSong = req.params.idSong;
        const tokenUser = req.cookies.tokenUser;
        if (!tokenUser) {
            return;
        }
        const song = yield song_model_1.default.findOne({
            _id: idSong,
            status: "active",
            deleted: false
        });
        const user = yield users_model_1.default.findOne({
            tokenUser: tokenUser,
            deleted: false
        });
        const userLike = song.like.includes(user.id);
        let newLike = 0;
        let countLike = song.like.length;
        if (!userLike && typeLike == "like") {
            newLike = countLike + 1;
            yield song_model_1.default.updateOne({
                _id: idSong
            }, {
                $push: { like: user.id }
            });
        }
        else {
            newLike = countLike - 1;
            yield song_model_1.default.updateOne({
                _id: idSong
            }, {
                $pull: { like: user.id }
            });
        }
        res.json({
            code: 200,
            message: "Thành công",
            newLike: newLike
        });
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeFavorite = req.params.typeFavorite;
        const idSong = req.params.idSong;
        const tokenUser = req.cookies.tokenUser;
        if (!tokenUser) {
            return;
        }
        const user = yield users_model_1.default.findOne({
            tokenUser: tokenUser,
            deleted: false
        });
        const favorite = yield favorite_song_model_1.default.findOne({
            userId: user.id,
            songId: idSong,
        });
        if (!favorite && typeFavorite == "favorite") {
            const data = {
                userId: user.id,
                songId: idSong,
            };
            const dataFavorite = new favorite_song_model_1.default(data);
            yield dataFavorite.save();
        }
        else {
            yield favorite_song_model_1.default.deleteOne({ _id: favorite.id });
        }
        res.json({
            code: 200,
            message: "Thành công",
        });
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const song = yield song_model_1.default.findOne({
            _id: idSong,
            status: "active",
            deleted: false
        });
        const listen = song.listen + 1;
        yield song_model_1.default.updateOne({
            _id: idSong
        }, {
            listen: listen
        });
        const newSong = yield song_model_1.default.findOne({
            _id: idSong
        });
        res.json({
            code: 200,
            message: "Thành công",
            listen: newSong.listen
        });
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.listen = listen;
