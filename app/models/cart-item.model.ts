
import { ObjectId } from "mongodb";

class CartItem {
    constructor(public productId:ObjectId, public quantity: number) {
    }
}

export default CartItem;