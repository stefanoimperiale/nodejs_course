import Product from "./product.model";
import CartItem from "./cart-item.model";
import User from "./user.model";

class OrderItem {
    constructor(
        public items: ({quantity: number}& Product)[],
        public user: User
        ) {
    }
}

export default OrderItem;