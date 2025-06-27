import { Express } from 'express';
import { systemConfig } from '../../config/config';

import { dashboardRoutes } from './dashboard.route';
import { topicsRoutes } from './topic.route';
import { songRoutes } from './song.route';
import { uploadRoutes } from './upload.route';
import { authRoutes } from './auth.route';
import { settingRoutes } from './settings.route';



const adminRoutes = (app: Express): void => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);

    app.use(PATH_ADMIN + "/topics", topicsRoutes);

    app.use(PATH_ADMIN + "/songs", songRoutes);

    app.use(PATH_ADMIN + "/upload", uploadRoutes);

    app.use(PATH_ADMIN + "/settings", settingRoutes);


}

export default adminRoutes;