import { Router } from "express";
import {
  getAllLivros,
  getLivro,
  createLivro,
  updateLivro,
  deleteLivro,
  emprestarLivro,
  devolverLivro,
} from "../controllers/livroController";

const router = Router();

router.get("/", getAllLivros);
router.get("/:id", getLivro);
router.post("/", createLivro);
router.put("/:id", updateLivro);
router.delete("/:id", deleteLivro);
router.get("/:id/emprestar", emprestarLivro);
router.get("/:id/devolver", devolverLivro);

export default router;
