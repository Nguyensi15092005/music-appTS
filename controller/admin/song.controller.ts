import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
    try {
        // sort
        let sort = {}
        const sortkey: string = req.query.sortkey as string;
        const sortValue: string = req.query.sortValue as string;

        if (req.query.sortkey && req.query.sortValue) {
            sort[sortkey] = sortValue;
        }
        else {
            sort["position"] = "desc";
        }
        const songs = await Song.find({
            deleted: false
        }).sort(sort);
        for (const item of songs) {
            const infoSinger = await Singer.findOne({
                _id: item.singerId,
                deleted: false,
                status: "active"
            })
            const infoTopic = await Topic.findOne({
                _id: item.topicId,
                deleted: false,
                status: "active"
            })

            item["infoSinger"] = infoSinger;
            item["infoTopic"] = infoTopic;
        }
        res.render("admin/pages/songs/index", {
            pageTitle: "Quản lý bài hát",
            songs: songs
        })
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect(systemConfig.prefixAdmin + "/dashboard");
    }
}

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
    try {
        const topics = await Topic.find({
            deleted: false,
            status: "active"
        });
        const singers = await Singer.find({
            deleted: false,
            status: "active"
        });
        res.render("admin/pages/songs/create", {
            pageTitle: "Thêm mới bài hát",
            topics: topics,
            singers: singers
        })
    } catch (error) {
        req.flash("error", "lỗi");
        res.redirect(systemConfig.prefixAdmin + "/dashboard")
    }
}

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
    try {
        if (req.body.position == "") {
            const countSong = await Song.countDocuments();
            req.body.position = countSong + 1
        }
        else {
            req.body.position = parseInt(req.body.position)
        }
        let avatar = "";
        let audio = "";
        if (req.body.avatar) {
            avatar = req.body.avatar[0]
        }
        if (req.body.audio) {
            audio = req.body.audio[0]
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
        }
        const song = new Song(dataSong);
        await song.save();
        res.redirect(systemConfig.prefixAdmin + "/songs");
    } catch (error) {
        req.flash("error", "lỗi");
        res.redirect(systemConfig.prefixAdmin + "/dashboard")
    }
}

// [GET] /admin/songs/edit:id
export const edit = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        const song = await Song.findOne({
            _id: id,
            deleted: false
        });

        const singers = await Singer.find({
            deleted: false
        }).select("fullName");

        const topics = await Topic.find({
            deleted: false
        }).select("title");

        res.render("admin/pages/songs/edit", {
            pageTitle: "Chỉnh sửa bài hát",
            song: song,
            singers: singers,
            topics: topics
        })
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect(systemConfig.prefixAdmin + "/dashboard");
    }
}

// [PATCH] /admin/songs/edit:id
export const editPatch = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
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

        await Song.updateOne({ _id: id }, dataSong);
        req.flash("success", "Cập nhật bài hát thành công");
        res.redirect(`${systemConfig.prefixAdmin}/songs/edit/${id}`);
    } catch (error) {
        console.log(error)
        req.flash("error", "Lỗi");
        res.redirect(systemConfig.prefixAdmin + "/dashboard");
    }
}
