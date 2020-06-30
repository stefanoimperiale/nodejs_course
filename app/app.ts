import express, {Express, NextFunction, Request, Response} from 'express';
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin"
import shopRoutes from "./routes/shop";
import path from "path";
import get404 from "./controllers/error"
import database from "./util/database";
import Product from "./models/product";
import User from "./models/user";
import Cart from "./models/cart";
import CartItem from "./models/cart-item";
import Order from "./models/order";
import OrderItem from "./models/order-item";

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', path.join('app', 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use(async (req:Request, res: Response, next: NextFunction) => {
    req.user = await User.findByPk(1);
    next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

database
    // .sync({force: true}) // don't use force in production, only in dev mode
    .sync()
    .then(_ => {
        return User.findByPk(1);
    }).then(user => {
    if (!user) {
        return User.create({name: 'Max', email: 'test@test.com'})
    }
    return user;
}).then(user => {
    return user.createCart();
}).then(cart => {
    app.listen(3000);
})
    .catch(err => {
        console.log(err);
    });

