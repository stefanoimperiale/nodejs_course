import {BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./user.model";
import Product from "./product.model";
import CartItem from "./cart-item.model";
import OrderItem from "./order-item.model";

@Table
class Cart extends Model {
    @ForeignKey(() => User)
    @Column
    public userId!: number;

    @BelongsTo(() => User)
    user!: User

    @BelongsToMany(() => Product, () => CartItem)
    products!: (Product & {CartItem: CartItem})[]
}

export default Cart;