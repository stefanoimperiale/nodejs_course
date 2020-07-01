import {AllowNull, BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./user.model";
import CartItem from "./cart-item.model";
import Cart from "./cart.model";

@Table
class Product extends Model {
    @Column
    title!: string;

    @Column
    price!: number;

    @Column
    imageUrl!: string;

    @Column
    description!: string;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User

}

export default Product;