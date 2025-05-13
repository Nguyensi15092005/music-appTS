import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import User from "../../models/users.model";


// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
    try {
        const topic = await Topic.findOne({
            slug: req.params.slugTopic,
            status: "active",
            deleted: false
        });

        const songs = await Song.find({
            topicId: topic.id,
            status: "active",
            deleted: false
        }).select("avatar title slug singerId like");

        for (const song of songs) {
            const infoSinger = await Singer.findOne({
                _id: song.singerId,
                status: "active",
                deleted: false
            });

            song["infoSinger"] = infoSinger;
        }

        res.render("client/pages/songs/list.pug", {
            pageTitle: topic.title,
            songs: songs
        })
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
    try {
        const slugSong: String = req.params.slugSong;
        const tokenUser: string = req.cookies.tokenUser
        const user = await User.findOne({
            tokenUser: tokenUser,
            deleted: false
        });
        const song = await Song.findOne({
            slug: slugSong,
            deleted: false,
            status: "active"
        });

        const active = song.like.includes(user.id) ? true : false; 

        const singer = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active"
        }).select("fullName");
        const topic = await Topic.findOne({
            _id: song.topicId,
            deleted: false
        }).select("title");

        res.render("client/pages/songs/detail", {
            pageTitle: song.title,
            song: song,
            singer: singer,
            topic: topic,
            active: active
        })
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
    try {
        const typeLike: string = req.params.typeLike;
        const idSong: string = req.params.idSong;
        const tokenUser: string = req.cookies.tokenUser
        if (!tokenUser) {
            return;
        }
        const song = await Song.findOne({
            _id: idSong,
            status: "active",
            deleted: false
        });

        const user = await User.findOne({
            tokenUser: tokenUser,
            deleted: false
        })

        const userLike = song.like.includes(user.id);
        let newLike: number = 0
        let countLike = song.like.length
        if (!userLike && typeLike == "like") {
            newLike = countLike + 1;
            await Song.updateOne(
                {
                    _id: idSong
                }, {
                $push: { like: user.id }
            });
        }
        else {
            newLike = countLike - 1;
            await Song.updateOne(
                {
                    _id: idSong
                }, {
                $pull: { like: user.id }
            });
        }

        res.json({
            code: 200,
            message: "Thành công",
            newLike: newLike
        })
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}


