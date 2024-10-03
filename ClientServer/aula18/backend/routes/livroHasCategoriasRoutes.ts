import { Router } from "express";
import { registerCategoriaIntoLivro } from "../controllers/livroHasCategoriasController";

const router = Router();

router.post("/", registerCategoriaIntoLivro);

export default router;
