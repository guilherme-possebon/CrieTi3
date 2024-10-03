import { Request, Response } from "express";
import { LivrosHasCategorias } from "../models/LivrosHasCategorias";

export const registerCategoriaIntoLivro = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let livroHasCategoria = new LivrosHasCategorias();

  livroHasCategoria.livros_id = req.body.livros_id;
  livroHasCategoria.categorias_id = req.body.categorias_id;

  let result = await livroHasCategoria.insert();
  return res.status(200).json(result);
};
