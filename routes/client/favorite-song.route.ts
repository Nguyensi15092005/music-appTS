import { Router } from 'express';

import * as controller from "../../controller/client/favorite-song.controller";
const router: Router = Router();

router.get("/", controller.index);






export const favoriteSongRoute: Router=router;