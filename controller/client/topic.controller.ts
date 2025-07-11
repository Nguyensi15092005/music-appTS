import { Request, Response } from "express";
import Topic from "../../models/topic.model";

export const index = async (req: Request, res: Response) => {
    try {
        const topics = await Topic.find({
            deleted: false
        });
        res.render("client/pages/topics/index", {
            pageTitle: "Chủ đề bài hát",
            topics: topics
        });
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}