import { Express } from 'express';

import { infuUser } from '../../middlewares/user.middleware';
import { requireAuth } from '../../middlewares/auth.middleware';

import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { userRoutes } from "./user.route";
import { dashboardRoutes } from './dashboard.route';
import { favoriteSongRoute } from './favorite-song.route';

const clientRoutes = (app: Express): void => {

    app.use(infuUser);

    app.use("/", dashboardRoutes);

    app.use("/topics", topicRoutes);

    app.use("/songs", songRoutes);

    app.use("/users", userRoutes);

    app.use("/favorite-songs", favoriteSongRoute);


}

export default clientRoutes;