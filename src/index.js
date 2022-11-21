import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import financialRoutes from "./routes/financialRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(financialRoutes);

app.listen(5000, () => {
  console.log("Server running in port: 5000");
});
