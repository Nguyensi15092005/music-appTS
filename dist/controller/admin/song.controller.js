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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sort = {};
        const sortkey = req.query.sortkey;
        const sortValue = req.query.sortValue;
        if (req.query.sortkey && req.query.sortValue) {
            sort[sortkey] = sortValue;
        }
        else {
            sort["position"] = "desc";
        }
        const songs = yield song_model_1.default.find({
            deleted: false
        }).sort(sort);
        for (const item of songs) {
            const infoSinger = yield singer_model_1.default.findOne({
                _id: item.singerId,
                deleted: false,
                status: "active"
            });
            const infoTopic = yield topic_model_1.default.findOne({
                _id: item.topicId,
                deleted: false,
                status: "active"
            });
            item["infoSinger"] = infoSinger;
            item["infoTopic"] = infoTopic;
        }
        res.render("admin/pages/songs/index", {
            pageTitle: "Quản lý bài hát",
            songs: songs
        });
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect(config_1.systemConfig.prefixAdmin + "/dashboard");
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topic_model_1.default.find({
            deleted: false,
            status: "active"
        });
        const singers = yield singer_model_1.default.find({
            deleted: false,
            status: "active"
        });
        res.render("admin/pages/songs/create", {
            pageTitle: "Thêm mới bài hát",
            topics: topics,
            singers: singers
        });
    }
    catch (error) {
        req.flash("error", "lỗi");
        res.redirect(config_1.systemConfig.prefixAdmin + "/dashboard");
    }
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.position == "") {
            const countSong = yield song_model_1.default.countDocuments();
            req.body.position = countSong + 1;
        }
        else {
            req.body.position = parseInt(req.body.position);
        }
        let avatar = "";
        let audio = "";
        if (req.body.avatar) {
            avatar = req.body.avatar[0];
        }
        if (req.body.audio) {
            audio = req.body.audio[0];
        }
        const dataSong = {
            title: req.body.title,
            topicId: req.body.topicId,
            singerId: req.body.singerId,
            description: req.body.description,
            position: req.body.position,
            status: req.body.status,
            avatar: avatar,
            audio: audio,
            lyrics: req.body.lyrics
        };
        const song = new song_model_1.default(dataSong);
        yield song.save();
        res.redirect(config_1.systemConfig.prefixAdmin + "/songs");
    }
    catch (error) {
        req.flash("error", "lỗi");
        res.redirect(config_1.systemConfig.prefixAdmin + "/dashboard");
    }
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const song = yield song_model_1.default.findOne({
            _id: id,
            deleted: false
        });
        const singers = yield singer_model_1.default.find({
            deleted: false
        }).select("fullName");
        const topics = yield topic_model_1.default.find({
            deleted: false
        }).select("title");
        res.render("admin/pages/songs/edit", {
            pageTitle: "Chỉnh sửa bài hát",
            song: song,
            singers: singers,
            topics: topics
        });
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect(config_1.systemConfig.prefixAdmin + "/dashboard");
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const dataSong = {
            title: req.body.title,
            topicId: req.body.topicId,
            singerId: req.body.singerId,
            description: req.body.description,
            status: req.body.status,
            lyrics: req.body.lyrics
        };
        if (req.body.position) {
            dataSong["position"] = parseInt(req.body.position);
        }
        if (req.body.avatar) {
            dataSong["avatar"] = req.body.avatar[0];
        }
        if (req.body.audio) {
            dataSong["audio"] = req.body.audio[0];
        }
        yield song_model_1.default.updateOne({ _id: id }, dataSong);
        req.flash("success", "Cập nhật bài hát thành công");
        res.redirect(`${config_1.systemConfig.prefixAdmin}/songs/edit/${id}`);
    }
    catch (error) {
        console.log(error);
        req.flash("error", "Lỗi");
        res.redirect(config_1.systemConfig.prefixAdmin + "/dashboard");
    }
});
exports.editPatch = editPatch;
