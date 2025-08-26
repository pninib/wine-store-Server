import { Router } from "express";
import { addwine, updatewine, deletewine, getwineById, getAllwines } from '../controllers/ProductController.js';
import { authAdmin } from "../middlewere/auth.js";

const router = Router();

router.post("/add_wine", authAdmin, addwine);
router.put("/:wineid", authAdmin, updatewine);
router.delete("/:id", authAdmin, deletewine);
router.get("/:id", getwineById);
router.get("/", getAllwines);

export default router;