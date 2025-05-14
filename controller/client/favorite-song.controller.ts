import { Request, Response } from "express";
import User from "../../models/users.model";
import FavoriteSong from "../../models/favorite-song.model";
import Song from '../../models/song.model';
import Singer from "../../models/singer.model";

// [GET] /favorite-songs
export const index = async (req: Request, res:Response)=>{
    const tokenUser: string = req.cookies.tokenUser;
    const user = await User.findOne({
        tokenUser: tokenUser,
        deleted: false
    });

    const favoriteSong = await FavoriteSong.find({
        userId: user.id
    })
    for(const favorite of favoriteSong){
        const infoSong = await Song.findOne({
            _id: favorite.songId,
            deleted: false,
            status: "active"
        })
        const infoSinger = await Singer.findOne({
            _id: infoSong.singerId
        })

        favorite["infoSong"] = infoSong;
        favorite["infoSinger"] = infoSinger;
    }

    res.render("client/pages/favorite-song/index",{
        pageTitle: "Bài hát yêu thích",
        favoriteSong: favoriteSong
    })
}