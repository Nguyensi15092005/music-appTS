import { Express } from 'express';
import { systemConfig } from '../../config/config';

import { dashboardRoutes } from './dashboard.route';
import { topicsRoutes } from './topic.route';


const adminRoutes = (app: Express): void => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);

    app.use(PATH_ADMIN + "/topics", topicsRoutes);



}

export default adminRoutes;