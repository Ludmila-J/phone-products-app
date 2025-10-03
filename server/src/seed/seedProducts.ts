// script pour ajouter des produits dans la base de données
// exécuter avec `npm run seed` dans le dossier server
import { MongoClient } from "mongodb";
import { connectDB } from "../config/db";

const products = [
  { _id: 1, name: "AC1 Phone1", type: "phone", price: 200.05, rating: 3.8, warranty_years: 1, available: true },
  { _id: 2, name: "AC2 Phone2", type: "phone", price: 147.21, rating: 1, warranty_years: 3, available: false },
  { _id: 3, name: "AC3 Phone3", type: "phone", price: 150, rating: 2, warranty_years: 1, available: true },
  { _id: 4, name: "AC4 Phone4", type: "phone", price: 50.20, rating: 3, warranty_years: 2, available: true }
];

const seedProducts = async () => {
  try {
    const db = await connectDB();

      // Supprimer d'abord tous les produits existants pour éviter les doublons
    const deleteResult = await db.collection("products").deleteMany({});
    console.log(`${deleteResult.deletedCount} produit(s) supprimé(s)`);   


    // insère plusieurs produits
    const insertResult = await db.collection("products").insertMany(products as any);
    console.log(`${insertResult.insertedCount} produit(s) ajoutés avec succès`);

    // termine le script
    process.exit(0); 
  } catch (error) {
    console.error("Erreur lors de l'ajout des produits :", error);
    process.exit(1);
  }
};

seedProducts();