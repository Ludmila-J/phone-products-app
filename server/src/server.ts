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





// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import http from "http";
// import { Server as IOServer } from "socket.io";
// import productRoutes from "./routes/product.routes";
// import authRoutes from "./routes/auth.routes";
// import { connectDB } from "./config/db";

// // charge automatiquement les variables du .env
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 4000;
// const server = http.createServer(app);

// // Création du serveur Socket.IO
// export const io = new IOServer(server, {
//   cors: {
//     // adapte en production
//     origin: "*", 
//     methods: ["GET", "POST", "PUT", "DELETE"]
//   }
// });

// io.on("connection", (socket) => {
//   console.log(" Client connecté via socket:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Client déconnecté:", socket.id);
//   });
// });

// // Lancement du serveur + DB
// async function start() {
//   await connectDB();
//   server.listen(PORT, () => {
//     console.log(`Serveur démarré sur http://localhost:${PORT}`);
//   });
// }

// start();













// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import { MongoClient } from "mongodb";
// import app from "./index";

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI!;

// const client = new MongoClient(MONGO_URI);

// async function startServer() {
//   try {
//     await client.connect();
//     console.log("Connecté à MongoDB");

//     app.listen(PORT, () => {
//       console.log(`Serveur lancé sur http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

// startServer();
