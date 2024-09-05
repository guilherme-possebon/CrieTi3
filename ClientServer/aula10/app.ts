// npm install express
// npm install @types/express
// npm install cors
// npm install @types/cors

import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Livro } from "./Livro";

let server: Express = express();

server.use(cors());
server.use(express.json());

let livros: Livro[] = [];

server.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json("oLA Mundo");
});

server.get("/livro", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json(livros);
});

// pegar um livro
server.get(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    if (codigo >= 0 && codigo < livros.length) {
      return res.status(200).json(livros[codigo]);
    }

    let erro = {
      codigo: codigo,
      erro: "Livro não encontrado.",
    };

    return res.status(400).json(erro);
  }
);

// gravar livro
server.post(
  "/livro",
  async (req: Request, res: Response): Promise<Response> => {
    let livro: Livro = new Livro();

    livro.titulo = req.body.titulo;
    livro.autor = req.body.autor;
    livro.qtPaginas = req.body.qtPaginas;
    livro.codigo = livros.length;

    livros.push(livro);
    return res.status(200).json(livro);
  }
);

// editar livro
server.put(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    if (codigo >= 0 && codigo < livros.length) {
      let livro = livros[codigo];

      livro.titulo = req.body.titulo;
      livro.autor = req.body.autor;
      livro.qtPaginas = req.body.qtPaginas;

      return res.status(200).json(livros[codigo]);
    }

    let erro = {
      codigo: codigo,
      erro: "Livro não encontrado.",
    };

    return res.status(400).json(erro);
  }
);

// deletar livro
server.delete(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    if (codigo >= 0 && codigo < livros.length) {
      livros.splice(codigo, 1);

      return res.status(200).json(livros[codigo]);
    }

    let erro = {
      codigo: codigo,
      erro: "Livro não encontrado.",
    };

    return res.status(400).json(erro);
  }
);

// emprestar livro
server.patch(
  "/livro/:codigo/emprestar",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    if (codigo >= 0 && codigo < livros.length) {
      let livro = livros[codigo];

      if (!livro.emprestado) {
        livro.emprestado = true;
      } else {
        let erro = {
          codigo: codigo,
          erro: "Livro já foi empretado para alguém",
          emprestado: livro.emprestado,
        };

        return res.status(400).json(erro);
      }

      return res.status(200).json(livros[codigo]);
    }

    let erro = {
      codigo: codigo,
      erro: "Livro não encontrado.",
    };

    return res.status(400).json(erro);
  }
);

// devolver livro
server.patch(
  "/livro/:codigo/devolver",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    if (codigo >= 0 && codigo < livros.length) {
      let livro = livros[codigo];

      if (livro.emprestado) {
        livro.emprestado = false;
      } else {
        let erro = {
          codigo: codigo,
          erro: "Livro já foi devolvido!",
          emprestado: livro.emprestado,
        };

        return res.status(400).json(erro);
      }

      return res.status(200).json(livros[codigo]);
    }

    let erro = {
      codigo: codigo,
      erro: "Livro não encontrado.",
    };

    return res.status(400).json(erro);
  }
);

server.listen(3000, () => {
  console.log("Server started on port 3000 http://localhost:3000/");
});
