import { Router } from 'express';

import * as controller from "../../controller/admin/auth.controller";
const router: Router = Router();

router.get("/", controller.login);

export const authRoutes: Router=router;