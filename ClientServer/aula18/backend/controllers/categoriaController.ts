import { Request, Response } from "express";
import { Categoria } from "../models/Categoria";

// Get all categories
export const getAllCategorias = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let categoria = new Categoria();
  let result = await categoria.findAllOnlyCategories();
  return res.status(200).json(result);
};

// Get a specific category by ID
export const getCategoria = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id = Number(req.params.id);
  let categoria = new Categoria();
  categoria.id = id;

  let result = await categoria.findOneById();
  if (result) {
    return res.status(200).json(result);
  }

  return res.status(400).json({ erro: "Categoria não encontrada." });
};

// Create a new category
export const createCategoria = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let categoria = new Categoria();
  categoria.name = req.body.name;

  let result = await categoria.save();

  if (result !== null) {
    return res.status(200).json(result);
  }

  return res.status(400).json({ erro: "Erro ao salvar uma categoria." });
};

// Update an existing category
export const updateCategoria = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id = Number(req.params.id);
  let categoria = new Categoria();
  categoria.id = id;

  let categoriaEncontrada = await categoria.findOneById();
  if (categoriaEncontrada) {
    categoria.name = req.body.name;

    console.log(categoria, 123);

    let result = await categoria.save();
    if (result !== null) {
      return res.status(200).json(result);
    }
    return res.status(400).json({ erro: "Erro ao atualizar a categoria." });
  }
  return res.status(400).json({ erro: "Categoria não encontrada." });
};

// Delete a category
export const deleteCategoria = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id = Number(req.params.id);
  let categoria = new Categoria();
  categoria.id = id;

  if (id > 0) {
    let result = await categoria.delete();
    if ("message" in result && result.message === "Deletado com sucesso!") {
      return res.status(200).json({ message: result.message });
    } else if (
      "message" in result &&
      "typeError" in result &&
      result.typeError === "RelatedToAnotherTable_error"
    ) {
      return res.status(400).json({ erro: result.message });
    } else if (
      "message" in result &&
      "typeError" in result &&
      result.typeError === "NotFinded_error"
    ) {
      return res.status(404).json({ erro: result.message });
    }

    return res
      .status(500)
      .json({ erro: "Erro desconhecido ao deletar categoria." });
  }

  return res.status(400).json({ erro: "Código inválido." });
};
