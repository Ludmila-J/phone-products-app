import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as IOServer } from "socket.io";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./config/db";

// Charger les variables d'environnement
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
console.log("productRoutes =", productRoutes);
console.log("authRoutes =", authRoutes);

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Route de test
app.get("/", (req, res) => {
  res.send("Hello Express + TypeScript fonctionne !");
});

// Création du serveur HTTP + Socket.IO
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

export const io = new IOServer(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] },
});

io.on("connection", (socket) => {
  console.log("Client connecté via Socket:", socket.id);
  socket.on("disconnect", () => console.log("Client déconnecté:", socket.id));
});

// Connexion à la DB et lancement serveur
async function start() {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Erreur serveur:", err);
  }
}

start();