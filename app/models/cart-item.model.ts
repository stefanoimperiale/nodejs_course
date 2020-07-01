import {AllowNull, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import Cart from "./cart.model";
import Product from "./product.model";

@Table
class CartItem extends Model {
    @ForeignKey(() => Cart)
    @Column
    public cartId!: number;

    @ForeignKey(() => Product)
    @Column
    public productId!: number;

    @Column
    public quantity!: number;
}

export default CartItem;