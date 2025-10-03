import { connectDB } from "../config/db";

const clearProducts = async () => {
  try {
    const db = await connectDB();
    const result = await db.collection("products").deleteMany({});
    console.log(`${result.deletedCount} produit(s) supprimé(s)`);
    // termine le script
    process.exit(0); 
  } catch (error) {
    console.error("Erreur lors de la suppression des produits :", error);
    process.exit(1);
  }
};

clearProducts();
