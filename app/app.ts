import {Express} from "express";
import express from 'express';
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import path from "path";

const app:Express = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next)=>{
   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
