import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";



// Chargement des variables d'environnement
dotenv.config();
// Connexion à la base de données
// Initialisation de l'application Express
const app = express();
export default app;

// pour lire JSON dans les requêtes
// activation de cors
app.use(cors());
connectDB();
app.use(express.json()); 

// routes des produits
app.use("/api/products", productRoutes);

// routes d'authentification
app.use("/api/auth", authRoutes);

// Route de test
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express + TypeScript fonctionne !");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
