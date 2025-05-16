import { Router } from 'express';

import * as controller from "../../controller/admin/song.controller";
const router: Router = Router();

router.get("/", controller.index);




export const songRoutes: Router=router;