import Product from "./product.model";
import CartItem from "./cart-item.model";

class Cart {
    constructor(public items:CartItem[] = []) {
    }
}

export default Cart;