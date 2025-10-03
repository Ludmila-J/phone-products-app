// import { connectDB } from "../config/db";
import { Request, Response } from "express";
import { db } from "../config/db";
import { ObjectId } from "mongodb";
import { productSchema } from "../validations/productValidation";
import { io } from "../server";

// GET all products
export const getProducts = async (req: Request, res: Response) => {
  const products = await db.collection("products").find().toArray();
  res.json(products);
};

// GET one product
export const getProduct = async (req: Request, res: Response) => {
  const product = await db.collection("products").findOne({ _id: new ObjectId(req.params.id) });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// CREATE
export const createProduct = async (req: Request, res: Response) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const result = await db.collection("products").insertOne(req.body);
  const created = { ...req.body, _id: result.insertedId };

  io.emit("productCreated", created); //  émettre événement

  res.status(201).json({ message: "Product created", id: result.insertedId });
};

// UPDATE
export const updateProduct = async (req: Request, res: Response) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const result = await db.collection("products").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );

  if (result.matchedCount === 0) return res.status(404).json({ message: "Product not found" });

  const updated = await db.collection("products").findOne({ _id: new ObjectId(req.params.id) });

  io.emit("productUpdated", updated); //  émettre événement

  res.json({ message: "Product updated" });
};

// DELETE
export const deleteProduct = async (req: Request, res: Response) => {
  const id = new ObjectId(req.params.id);
  const result = await db.collection("products").deleteOne({ _id: id });

  if (result.deletedCount === 0) return res.status(404).json({ message: "Product not found" });

  io.emit("productDeleted", { _id: req.params.id }); //  émettre événement

  res.json({ message: "Product deleted" });
};