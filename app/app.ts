import {Express} from "express";
import express from 'express';
import bodyParser from "body-parser";
import {router as adminRoutes} from "./routes/admin"
import shopRoutes from "./routes/shop";
import path from "path";

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', path.join('app', 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: null
    });
});

app.listen(3000);
