import {NextFunction, Request, Response} from "express";

const express = require('express');

const app = express();

app.use((req: Request, res:Response, next:NextFunction) =>
{
    console.log('In the another middleware');
    res.send('<h1>Hello from Express</h1>');
});

app.listen(3000);
