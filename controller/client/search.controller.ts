import { Request, Response } from "express"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helper/convertToSlug";


export const result = async (req: Request, res: Response) => {
    try {
        const keyword: string = `${req.query.keyword}`;

        let newSongs = [];

        if(keyword){
            const keywordRegex = new RegExp(keyword, "i");

            // tạo slug ko dấu, có dấu - ngăn cách 
            // TV unidecode
            const stringSlug = convertToSlug(keyword);

            const strignSlugRegex = new RegExp(stringSlug, "i");

            const songs  = await Song.find({
                $or:[
                    {title: keywordRegex},
                    {slug: strignSlugRegex}
                ]
            })
            for(const item of songs){
                const infoSinger = await Singer.findOne({
                    _id: item.singerId,
                    deleted: false
                });

                item["countLike"] = item.like.length;

                item["infoSinger"] = infoSinger;
            }
            newSongs = songs;
        }
        
        res.render("client/pages/search/result", {
            pageTitle: keyword,
            keyword: keyword,
            songs: newSongs
        })
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/")
    }

}