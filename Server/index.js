import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import revengeRoutes from "./routes/revengeRoutes.js";
import tauntRoutes from "./routes/tauntRoutes.js";

dotenv.config();

const app = express();
const port = 5050;
const { API_KEY } = process.env;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const { ORIGIN } = process.env;
app.use(cors());

app.use("/revenge", revengeRoutes);
app.use("/taunt", tauntRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
