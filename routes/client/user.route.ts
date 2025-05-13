import { login } from './../../../task-management-TS/api/v1/controller/user.controller';
import { Router } from 'express';

import * as controller from "../../controller/client/user.controller";
import * as validate from "../../validates/client/user.validate";
const router: Router = Router();

router.get("/register", controller.register);

router.post("/register",validate.register, controller.registerPost);

router.get("/login", controller.login);

router.post("/login",validate.login, controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot",validate.forgot, controller.forgotPasswordPost);

router.get('/password/otp', controller.otpPassword);

router.post('/password/otp',validate.otpPasswordPost, controller.otpPasswordPost);

router.get('/password/reset', controller.resetPassword);

router.post('/password/reset', controller.resetPasswordPost);









export const userRoutes: Router = router;