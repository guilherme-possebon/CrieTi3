import { Request, Response } from "express";
import { Livro } from "../models/livro";
import { dbQuery } from "../database";

export const getAllLivros = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let livro = new Livro();
  let result = await livro.findAll();
  return res.status(200).json(result);
};

export const getLivro = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id = Number(req.params.id);
  let livro = new Livro();
  livro.id = id;
  let result = await livro.findOneById();

  if (result) {
    return res.status(200).json(result);
  }

  return res.status(400).json({ erro: "Livro não encontrado." });
};

export const createLivro = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let livro = new Livro();
  livro.titulo = req.body.titulo;
  livro.autor = req.body.autor;
  livro.qtpaginas = req.body.qtpaginas;
  livro.emprestado = req.body.emprestado;

  let result = await livro.save();
  return res.status(200).json(result);
};

// Update an existing book
export const updateLivro = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id = Number(req.params.id);

  let livro = new Livro();

  livro.id = id;
  let livroEcontrado = await livro.findOneById();
  if (livroEcontrado) {
    livro.titulo = req.body.titulo;
    livro.autor = req.body.autor;
    livro.qtpaginas = req.body.qtpaginas;

    let result = await livro.save();
    return res.status(200).json(result);
  }

  return res.status(400).json({ erro: "Livro não encontrado." });
};

// Delete a book
export const deleteLivro = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id = Number(req.params.id);

  if (id > 0) {
    let livro = new Livro();
    livro.id = id;
    let result = await livro.delete();

    if (
      "message" in result &&
      result.message === "Livro deletado com sucesso!"
    ) {
      return res.status(200).json({ message: result.message });
    }

    return res.status(400).json({ erro: "Livro não encontrado." });
  }

  return res.status(400).json({ erro: "Código inválido." });
};

// Lend a book
export const emprestarLivro = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id = Number(req.params.id);

  let livro = new Livro();
  livro.id = id;

  let livroEspecifico = await livro.findOneById();
  if (!livroEspecifico?.titulo) {
    return res.status(400).json({ erro: "Livro não encontrado." });
  }

  if (livroEspecifico.emprestado === true) {
    return res.status(400).json({ erro: "Livro já emprestado." });
  }

  let sql = "UPDATE livros SET emprestado = true WHERE id = $1;";
  await dbQuery(sql, [id]);

  return res.status(200).json({ message: "Livro emprestado com sucesso." });
};

// Return a book
export const devolverLivro = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id = Number(req.params.id);

  let livro = new Livro();
  livro.id = id;

  let livroEspecifico = await livro.findOneById();
  if (!livroEspecifico?.titulo) {
    return res.status(400).json({ erro: "Livro não encontrado." });
  }

  if (livroEspecifico.emprestado === false) {
    return res.status(400).json({ erro: "Livro não está emprestado." });
  }

  let sql = "UPDATE livros SET emprestado = false WHERE id = $1;";
  await dbQuery(sql, [id]);

  return res.status(200).json({ message: "Livro devolvido com sucesso." });
};
