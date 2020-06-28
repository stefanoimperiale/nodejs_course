import fs from "fs-extra"
import path from "path";
import dirname from "../helpers/path";
import {Cart as CartType} from "../types/types"
import Product from "./product";

const p = path.join(dirname, 'data', 'cart.json');

export default class Cart {

    static addProduct(id: number, productPrice: number) {
        // fetch the previous cart
        fs.readFile(p, 'utf-8', (err, fileContent) => {
            let cart: CartType = {products: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product / increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty++;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice += productPrice;

            fs.outputFile(p, JSON.stringify(cart), writeErr => {
                // tslint:disable-next-line:no-console
                if (writeErr) console.error(writeErr);
            })
        })
    }
}
