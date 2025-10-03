import { MongoClient, Db } from "mongodb";

// vérifie ton MongoDB local
const uri = "mongodb://localhost:27017"; 

// même nom que dans le code front-end
const dbName = "phone_products_app";

let client: MongoClient;
let db: Db;
export { db };

export const connectDB = async (): Promise<Db> => {

  if (!db) {  

   client = new MongoClient(uri);
    await client.connect()

  console.log("Connexion réussi à MongoDB");
    db = client.db(dbName);
}
  return db;
};
