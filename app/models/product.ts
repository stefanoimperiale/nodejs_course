import fs from "fs-extra";
import dirname from "../helpers/path"
import path from "path";
import Cart from "./cart";

const p = path.join(dirname, 'data', 'products.json');


function getProductsFromFile(): Promise<Product[]> {
    return fs.promises.readFile(p, "utf-8")
        .then(fileContent => JSON.parse(fileContent))
        .catch(_ => []);
}

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
        const products = await getProductsFromFile();
        let updatedProducts;
        if (this.id) {
            const existingProductIndex = products.findIndex(prod => prod.id === this.id);
            updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;
        } else {
            this.id = Math.random();
            products.push(this);
            updatedProducts = products;
        }
        fs.outputFile(p, JSON.stringify(updatedProducts), (writeErr) => {
            // tslint:disable-next-line:no-console
            if (writeErr) console.error(writeErr)
        });
    }

    static async deleteById(id: number) {
       const products = await getProductsFromFile();
       const product = products.find(prod => prod.id === id);
       if (!product) throw new Error(`product with id ${id} not found`);
       const updatedProducts = products.filter(prod => prod.id !== id);
       fs.outputFile(p, JSON.stringify(updatedProducts), err => {
           if (!err) {
               Cart.deleteProduct(id, product.price);
           }
       })
    }

    static fetchAll(): Promise<Product[]> {
        return getProductsFromFile();
    }

    static async findById(id: number): Promise<Product | undefined> {
        const products = await getProductsFromFile();
        return products.find(pr => pr.id === id);
    }
}
