import { Router } from "express";
import { addUser, login, getAllUsers, deleteUser, getUserById, getCurrentUser } from '../controllers/UserController.js';
import { auth, authAdmin } from "../middlewere/auth.js";
import { verifyEmail } from '../controllers/emailController.js';

const router = Router();

router.post("/add_user", addUser);
router.post("/verify_email", verifyEmail)
router.post("/login", login);
router.get("/get_user_byId/:id", authAdmin, getUserById);
router.delete("/:id", authAdmin, deleteUser);
router.get("/me", auth, getCurrentUser);
router.get("/", authAdmin, getAllUsers);

export default router;