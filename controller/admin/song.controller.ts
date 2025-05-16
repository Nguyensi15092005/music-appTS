import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";

export const index = async (req: Request, res: Response) => {
    try {
        const songs = await Song.find({
            deleted: false
        });
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

    }
}