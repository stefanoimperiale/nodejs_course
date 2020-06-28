import dirname from "../util/path"
import path from "path";
import db from "../util/database"
import Cart from "./cart";

const p = path.join(dirname, 'data', 'products.json');

export default class Product {

    constructor(
        public id: number | null,
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number
    ) {
    }

    public async save() {
        return db.execute(`INSERT INTO products (title, price, imageUrl, description)
                    VALUES (?, ?, ?, ?)`,[this.title, this.price, this.imageUrl, this.description]);
    }

    static async deleteById(id: number) {
        // const products = await getProductsFromFile();
        // const product = products.find(prod => prod.id === id);
        // if (!product) throw new Error(`product with id ${id} not found`);
        // const updatedProducts = products.filter(prod => prod.id !== id);
        // fs.outputFile(p, JSON.stringify(updatedProducts), err => {
        //     if (!err) {
        //         Cart.deleteProduct(id, product.price);
        //     }
        // })
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products')
    }

    static findById(id: number) {
       return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }
}
