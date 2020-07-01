import {BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./user.model";
import Product from "./product.model";
import OrderItem from "./order-item.model";

@Table
class Order extends Model {
    @ForeignKey(() => User)
    @Column
    public userId!: number;

    @BelongsTo(() => User)
    user!: User

    @BelongsToMany(() => Product, () => OrderItem)
    products!: (Product & {OrderItem: OrderItem}) []
}


export default Order;