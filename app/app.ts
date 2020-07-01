import express, {Express, NextFunction, Request, Response} from 'express';
import bodyParser from "body-parser";
import errorHandler from "strong-error-handler";
import adminRoutes from "./routes/admin"
import shopRoutes from "./routes/shop";
import path from "path";
import get404 from "./controllers/error"
import database from "./util/database";
import User from "./models/user.model";
import Cart from "./models/cart.model";

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', path.join('app', 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use(async (req: Request, res: Response, next: NextFunction) => {
    req.user = (await User.findByPk(1))!;
    next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.use(errorHandler({
    debug: process.env.ENV !== 'prod',
    log: true,
}));

(async () => {
    try {
        await database
            .sync({force: false}) // don't use force in production, only in dev mode
        let user = await User.findByPk(1);
        if (!user) {
            user = await User.createNew( 'Max',  'test@test.com');
            await user.$create<Cart>('cart', {});
        }
        app.listen(3000);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
    }
})()