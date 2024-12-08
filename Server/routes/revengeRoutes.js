import express from "express";
import {
  papyrusRevenge,
  edwardRevenge,
  rockRevenge,
} from "../utils/helpers.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const { API_KEY } = process.env;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const router = express.Router();

router.get("/papyrus", async (req, res) => {
  const { userName } = req.query;
  try {
    const response = await papyrusRevenge(model, userName);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "failed to retrieve Papyrus response" });
  }
});

router.get("/edward-scissorhands", async (req, res) => {
  const { userName } = req.query;
  try {
    const response = await edwardRevenge(model, userName);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "failed to retrieve Edward's response" });
  }
});

router.get("/the-rock", async (req, res) => {
  const { userName } = req.query;
  try {
    const response = await rockRevenge(model, userName);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "failed to retrieve The Rock's response" });
  }
});

export default router;
