import {getDb} from "../util/database";
import {ObjectId} from "mongodb";
import Product from "./product.model";
import Cart from "./cart.model";
import OrderItem from "./order-item.model";

const userColl = 'users';

class User {
    public _id: ObjectId | null;

    constructor(
        public name: string,
        public email: string,
        public cart: Cart,
        _id?: string | ObjectId | null,
    ) {
        this._id = _id ? new ObjectId(_id) : null;
    }

    save() {
        const db = getDb();
        return db.collection(userColl).insertOne(this);
    }

    addToCart(product: Product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toHexString() === product._id?.toHexString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id!),
                quantity: newQuantity
            })
        }
        const updatedCart = {
            items: updatedCartItems
        };
        const db = getDb();
        return db.collection(userColl).updateOne(
            {_id: this._id},
            {$set: {cart: updatedCart}}
        )
    }

    static findById(userId: string | ObjectId) {
        return getDb().collection(userColl)
            .findOne<User>({_id: new ObjectId(userId)})
    }

    async getCart() {
        const productIds = this.cart.items.map(prod => prod.productId);
        const products = await getDb()
            .collection('products')
            .find<Product>({_id: {$in: productIds}})
            .toArray();
        return products.map(prod => {
            return {
                ...prod,
                quantity: this.cart.items
                    .find(i => i.productId.toHexString() === prod._id?.toHexString())!
                    .quantity
            }
        })
    }

    deleteItemFromCart(productId: ObjectId) {
        const updatedCartItems = this.cart.items.filter(item => item.productId.toHexString() !== productId.toHexString());
        return getDb()
            .collection(userColl)
            .updateOne(
                {_id: this._id},
                {$set: {cart: {items: updatedCartItems}}}
            );

    }

    async addOrder() {
        const db = getDb();
        const products = await this.getCart();
        const order = {
            items: products,
            user: {
                _id: this._id,
                name: this.name
            }
        }
        await db
            .collection('orders')
            .insertOne(order);
        this.cart = {items: []}
        return db
            .collection(userColl)
            .updateOne(
                {_id: this._id},
                {$set: {cart: this.cart }}
            )

    }

    getOrders() {
        const db = getDb();
        return db.collection('orders')
            .find({
                "user._id": this._id
            })
            .toArray();
    }
}

export default User;