import { Router } from "express";
import { addOrder, updateOrder, deleteOrder, getOrderById, getAllOrderes } from '../controllers/OrderController.js';
import { authAdmin } from "../middlewere/auth.js";

const router = Router();

router.post("/", addOrder);
router.put("/:id", authAdmin, updateOrder);
router.delete("/:id", authAdmin, deleteOrder);
router.get("/:id", getOrderById);
router.get("/", authAdmin, getAllOrderes);

export default router;