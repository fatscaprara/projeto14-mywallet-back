import express from "express";
import {
  setTransaction,
  getTransactions,
} from "../controllers/financialController.js";
import { validateAuthMiddleware } from "../middleware/validateAuthMiddleware.js";

const router = express.Router();

router.get("/transactions", validateAuthMiddleware, getTransactions);
router.post("/transactions", validateAuthMiddleware, setTransaction);

export default router;
