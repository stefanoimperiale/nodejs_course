import {Express} from "express";
import express from 'express';
import bodyParser from "body-parser";
import {router as adminRoutes} from "./routes/admin"
import shopRoutes from "./routes/shop";
import path from "path";
import expressHbs from "express-handlebars";

const app: Express = express();

app.engine('hbs', expressHbs({
    layoutsDir: 'app/views/layouts/',
    extname: 'hbs',
    defaultLayout: 'main-layout'
}));

app.set('view engine', 'hbs');
app.set('views', path.join('app', 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);
