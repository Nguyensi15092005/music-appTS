import { Router } from 'express';
import multer from 'multer';
const upload = multer();

import * as controller from "../../controller/admin/upload.controller";
import * as uploadCloud from '../../middlewares/admin/uploadClou.middleware';

const router: Router = Router();

router.post(
    "/", 
    upload.single("file"), 
    uploadCloud.uploadSingle,
    controller.index
);




export const uploadRoutes: Router=router;