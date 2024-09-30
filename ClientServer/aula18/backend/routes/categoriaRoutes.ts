import { Router } from "express";
import {
  getAllCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../controllers/categoriaController";

const router = Router();

router.get("/", getAllCategorias);
router.get("/:id", getCategoria);
router.post("/", createCategoria);
router.put("/:id", updateCategoria);
router.delete("/:id", deleteCategoria);

export default router;
