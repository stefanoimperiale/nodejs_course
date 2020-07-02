import express, {Express, NextFunction, Request, Response} from 'express';
import bodyParser from "body-parser";
import errorHandler from "strong-error-handler";
import path from "path";
import get404 from "./controllers/error"
import database, {getDb} from "./util/database";
import User from "./models/user.model";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import Cart from "./models/cart.model";
import { ObjectId } from 'mongodb';

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
    const user = (await User.findById(userId))!;
    req.user = new User(user.name, user.email,  user.cart, user._id);
    next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.use(errorHandler({
    debug: process.env.ENV !== 'prod',
    log: true,
}));

const userId = new ObjectId('5efe2693e03e6ab9e8347dfe');

(async () => {
    await database();
    if (!(await getDb().collection('users').findOne({_id: userId}))) {
        const user = new User('Max', 'test@test.com', {items: [] },userId);
        await user.save();
    }
    app.listen(3000);
})()