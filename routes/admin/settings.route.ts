import { Router } from 'express';

import * as controller from "../../controller/admin/setting.controller";
const router: Router = Router();

router.get("/", controller.index);




export const settingRoutes: Router=router;