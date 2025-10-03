import { Router } from "express"; 
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController";
import { verifyToken } from "../middlewares/auth";

const router = Router();

// accès aux produits sans login
router.get("/", getProducts); 
router.get("/:id", getProduct); 

// accès sécurisé aux produits avec JWT valide
router.post("/",verifyToken, createProduct); 
router.put("/:id",verifyToken, updateProduct);
router.delete("/:id",verifyToken, deleteProduct);
 
 export default router;