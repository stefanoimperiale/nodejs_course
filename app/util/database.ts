import {MongoClient} from "mongodb";

const user = "user";
const pass = "node-psw";
const dbName = "shop";

let _client: MongoClient;

const database = async () => {
    try {
        _client = await MongoClient
            .connect(`mongodb://${user}:${pass}@localhost:27016`,
                { useUnifiedTopology: true });
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        throw e;
    }
}

export const getDb = (db=dbName)=> {
    const retDb =  _client.db(db);
    if (retDb) {
        return retDb;
    }
    throw new Error('No database found!');
}

export default database;