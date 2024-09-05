//npm install express
//npm install @types/express
//npm install cors
//npm install @types/cors
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Livro } from "./livro";

const port: Number = 3000;
let server: Express = express();

server.use(cors());
server.use(express.json());

let livros: Livro[] = [];

server.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json("Olá, mundo!");
});

server.get("/livro", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json(livros);
});

//pegar um livro
server.get(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    if (codigo >= 0 && codigo < livros.length) {
      return res.status(200).json(livros[codigo]);
    }

    let erro = { codigo: codigo, erro: "Livro não encontrado." };

    return res.status(400).json(erro);
  }
);

//gravar livro
server.post(
  "/livro",
  async (req: Request, res: Response): Promise<Response> => {
    let livro = new Livro();
    livro.titulo = req.body.titulo;
    livro.autor = req.body.autor;
    livro.qtPaginas = req.body.qtPaginas;
    livro.codigo = livros.length;
    livros.push(livro);

    return res.status(200).json(livro);
  }
);

//editar livro
server.put(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    if (codigo >= 0 && codigo < livros.length) {
      let livro = livros[codigo];
      livro.titulo = req.body.titulo;
      livro.autor = req.body.autor;
      livro.qtPaginas = req.body.qtPaginas;

      return res.status(200).json(livro);
    }

    let erro = { codigo: codigo, erro: "Livro não encontrado." };

    return res.status(400).json(erro);
  }
);

server.delete(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    if (codigo >= 0 && codigo < livros.length) {
      let livro = livros[codigo];
      livros.splice(codigo, 1);

      return res.status(200).json(livro);
    }

    let erro = { codigo: codigo, erro: "Livro não encontrado." };

    return res.status(400).json(erro);
  }
);

server.get(
  "/livro/:codigo/emprestar",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    if (codigo >= 0 && codigo < livros.length) {
      let livro = livros[codigo];

      if (livro.emprestado == true) {
        let erro = {
          codigo: codigo,
          erro: "Livro já emprestado.",
        };

        return res.status(400).json(erro);
      } else {
        livro.emprestado = true;
      }

      return res.status(200).json(livro);
    }

    let erro = { codigo: codigo, erro: "Livro não encontrado." };

    return res.status(400).json(erro);
  }
);

server.get(
  "/livro/:codigo/devolver",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    if (codigo >= 0 && codigo < livros.length) {
      let livro = livros[codigo];

      if (livro.emprestado == false) {
        let erro = {
          codigo: codigo,
          erro: "Livro não esta emprestado.",
        };

        return res.status(400).json(erro);
      } else {
        livro.emprestado = false;
      }

      return res.status(200).json(livro);
    }

    let erro = { codigo: codigo, erro: "Livro não encontrado." };

    return res.status(400).json(erro);
  }
);

server.listen(port, () => {
  console.log("Server iniciado na porta " + port);
});
