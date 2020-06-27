import {Request, Response} from "express";

const get404 = (req:Request, res:Response) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: null
    });
}

export default get404;
