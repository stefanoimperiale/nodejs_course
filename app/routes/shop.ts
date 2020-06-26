import {NextFunction, Request, Response, Router} from "express";

import path from 'path';
import express from 'express';

const router: Router = express.Router();

router.get('/', (req, res, next) => {
   res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

export default router;
