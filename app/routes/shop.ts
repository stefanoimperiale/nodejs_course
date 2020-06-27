import express, {Router} from "express";
import * as adminData from "./admin";

const router: Router = express.Router();

router.get('/', (req, res, next) => {
    res.render('shop', {
        prods: adminData.products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: adminData.products.length > 0,
        activeShop: true,
        productCSS: true,
    });
});

export default router;
