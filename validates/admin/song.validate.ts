import { NextFunction, Request, Response } from "express";
import { systemConfig } from "../../config/config";

export const createSong = async (req: Request, res: Response, next: NextFunction) =>{
    if(!req.body.title){
        req.flash("error", "vui lòng nhập Tiêu đề bài hát!!!")
        res.redirect(systemConfig.prefixAdmin + "/songs/create");
        return;
    }

    if(!req.body.topicId){  
        req.flash("error", "vui lòng chọn chủ đề bài hát!!!")
        res.redirect(systemConfig.prefixAdmin + "/songs/create");
        return;
    }

    if(!req.body.singerId){  
        req.flash("error", "vui lòng chọn ca sĩ!!!")
        res.redirect(systemConfig.prefixAdmin + "/songs/create");
        return;
    }

    next();//hàm nexext để nó đi tiếp
}