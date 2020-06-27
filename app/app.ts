import express, {Express} from 'express';
import bodyParser from "body-parser";
import {router as adminRoutes} from "./routes/admin"
import shopRoutes from "./routes/shop";
import path from "path";
import get404 from "./controllers/error"

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', path.join('app', 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.listen(3000);
