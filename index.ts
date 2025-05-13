import express, {Express} from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
import bodyParser from'body-parser';

// flash
import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";

dotenv.config();
database.connect();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// flash 
app.use(cookieParser('SISISISISISISI'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end flash

// để lấy đc thuộc tính trong req.body
app.use(bodyParser.urlencoded({ extended: false }))

// nhúng file tĩnh 
app.use(express.static("public"));

app.set("views", "./views");
app.set('view engine', 'pug');

// client Routes
clientRoutes(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})