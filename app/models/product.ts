import fs from "fs-extra";
import dirname from "../helpers/path"
import path from "path";

const p = path.join(dirname, 'data', 'products.json');


function getProductsFromFile(): Promise<Product[]> {
    return fs.promises.readFile(p, "utf-8")
        .then(fileContent => JSON.parse(fileContent))
        .catch(_ => []);
}

export default class Product {

    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number
    ) {}

    async save() {
        const products = await getProductsFromFile();
        products.push(this);
        fs.outputFile(p, JSON.stringify(products), (writeErr) => {
            // tslint:disable-next-line:no-console
            if (writeErr) console.error(writeErr)
        });
    }

    static fetchAll(): Promise<Product[]> {
        return getProductsFromFile();
    }
}
