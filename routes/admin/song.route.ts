import { Router } from 'express';
import multer from 'multer';
const upload = multer();
import * as controller from "../../controller/admin/song.controller";
import * as uploadCloud from '../../middlewares/admin/uploadClou.middleware';
import * as validate from "../../validates/admin/song.validate";

const router: Router = Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
    "/create",
    upload.fields([
        { name: 'avatar', maxCount: 1 }, 
        { name: 'audio', maxCount: 1 }
    ]), 
    uploadCloud.uploadFields,
    validate.createSong,
    controller.createPost
);





export const songRoutes: Router=router;