import {AllowNull, Column, Table, Model, HasMany, HasOne, IsEmail} from "sequelize-typescript";
import Product from "./product.model";
import Order from "./order.model";
import Cart from "./cart.model";

@Table
class User extends Model {

    @AllowNull(false)
    @Column
    name!: string;


    @Column
    email?: string;

    @HasMany(() => Product)
    products!: Product[];

    @HasMany(() => Order)
    orders!: Order []

    @HasOne(() => Cart)
    cart!: Cart

    static createNew(name: string, email: string) {
        return this.create({name, email});
    }
}

export default User;