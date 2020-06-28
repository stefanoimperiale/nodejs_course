import fs from "fs-extra"
import path from "path";
import dirname from "../helpers/path";

const p = path.join(dirname, 'data', 'cart.json');

export interface ICart {
    products: { id: number, qty: number }[],
    totalPrice: number
}

export default class Cart {

    static addProduct(id: number, productPrice: number) {
        // fetch the previous cart
        fs.readFile(p, 'utf-8', (err, fileContent) => {
            let cart: ICart = {products: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product / increase quantity
            if (existingProduct) {
                updatedProduct = {...existingProduct};
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

    static deleteProduct(id: number, productPrice: number) {
        fs.readFile(p, 'utf-8', (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart:ICart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.id === id);
            if (product) {
                const productQty = product.qty;
                updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
                updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
                fs.outputFile(p, JSON.stringify(updatedCart), writeErr => {
                    // tslint:disable-next-line:no-console
                    if (writeErr) console.error(writeErr);
                })
            }
        });
    }

    static async getCart(): Promise<ICart | null> {
        try {
            const content = await fs.promises.readFile(p, 'utf-8');
            return JSON.parse(content);
        } catch (_) {
            return null;
        }
    }
}
