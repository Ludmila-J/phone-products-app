import { Request, Response } from "express"; 
import { db } from "../config/db"; 
import argon2 from "argon2";
import jwt from "jsonwebtoken"; 
import { loginSchema, registerSchema } from "../validations/userValidation";

// REGISTER : créer un nouvel utilisateur et générer le token
export const register = async (req: Request, res: Response) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
   
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existing = await db.collection("users").findOne({ email }); 
    if (existing) return res.status(400).json({ message: "User already exists" }); 

    // Hasher le mot de passe
    const hashedPassword = await argon2.hash(password); 
    
    // Insérer l'utilisateur dans la base
    const result = await db.collection("users").insertOne({ email, password: hashedPassword });

    // Génération du token JWT
    const token = jwt.sign(
        { id: result.insertedId, email }, 
        process.env.JWT_SECRET!, 
        { expiresIn: "1d" }
    );

    // Réponse avec token et informations utilisateur
    res.status(201).json({ 
        message: "User created", 
        token, 
        user: { _id: result.insertedId, email } 
    }); 
};

// LOGIN : authentifier un utilisateur existant et générer le token
export const login = async (req: Request, res: Response) => { 
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message }); 
    
    const { email, password } = req.body; 
    
    // Vérifier si l'utilisateur existe
    const user = await db.collection("users").findOne({ email }); 
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
     
    // Vérifier le mot de passe
    const valid = await argon2.verify(user.password, password); 
    if (!valid) return res.status(400).json({ message: "Invalid credentials" }); 
    
    // Génération du token JWT
    const token = jwt.sign(
        { id: user._id, email: user.email }, 
        process.env.JWT_SECRET!, 
        { expiresIn: "1d" }
    );
     
    // Réponse avec token et infos utilisateur
    res.json({ 
        token, 
        user: { _id: user._id, email: user.email } 
    });
};