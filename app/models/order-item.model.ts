import {AllowNull, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import Order from "./order.model";
import Product from "./product.model";

@Table
class OrderItem extends Model {
    @Column
    public quantity!: number;

    @ForeignKey(() => Order)
    @Column
    public orderId!: number;

    @ForeignKey(() => Product)
    @Column
    public productId!: number;
}

export default OrderItem;