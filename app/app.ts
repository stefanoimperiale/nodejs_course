import {NextFunction, Request, Response, Express} from "express";
import express from 'express';
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";

const app:Express = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next)=>{
   res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);
