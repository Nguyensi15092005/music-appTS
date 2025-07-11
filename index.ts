import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import methodoverride from "method-override";
import clientRoutes from "./routes/client/index.route";
import path from "path";

// flash
import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/config";

dotenv.config();

database.connect();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// flash 
app.use(cookieParser('SISISISISISISI'));
app.use(session({
  secret: 'SISISISISISISI',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
//end flash

// Method-override
app.use(methodoverride("_method"));
// End Method-override


// để lấy đc thuộc tính trong req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// nhúng file tĩnh 
app.use(express.static(`${__dirname}/public`));


app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');

// TinyMCE
app.use(
    '/tinymce',
    express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);
// End TinyMCE

// client Routes
clientRoutes(app);
adminRoutes(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})