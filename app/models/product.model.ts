import {getDb} from "../util/database";
import {ObjectId} from "mongodb";

const productsColl = 'products';

class Product {
    public _id: ObjectId | null;
    private userId: ObjectId | null;

    constructor(
        public title: string,
        public price: number,
        public description: string,
        public imageUrl: string,
        _id?: string | null,
        userId?: string | null
    ) {
        this._id = _id ? new ObjectId(_id) : null;
        this.userId = userId? new ObjectId(userId) : null;
    }

    async save() {
        const db = getDb();
        try {
            if (this._id) {
                // Es6 assign
                const productToUpdate = {
                    ...this
                };
                delete productToUpdate._id;
                return await db.collection(productsColl)
                    .updateOne({_id: this._id}, {$set: productToUpdate});
            } else {
                return await db.collection(productsColl).insertOne(this);
            }
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
        }
    }

    static fetchAll() {
        return getDb().collection(productsColl)
            .find<Product>({})
            .toArray();
    }

    static findById(prodId: string) {
        return getDb().collection(productsColl)
            .findOne<Product>({
                _id: new ObjectId(prodId)
            })
    }

    static deleteById(prodId: string) {
        return getDb().collection(productsColl)
            .deleteOne({_id: new ObjectId(prodId)})
    }
}

export default Product;