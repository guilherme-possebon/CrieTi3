//npm install express
//npm install @types/express
//npm install cors
//npm install @types/cors
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Livro } from "./livro";
import { client, dbQuery } from "./database";
import { Categoria } from "./categoria";

const port: Number = 3000;
let server: Express = express();

server.use(cors());
server.use(express.json());

server.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json("Olá, mundo!");
});

server.get("/livro", async (req: Request, res: Response): Promise<Response> => {
  let livro = new Livro();
  let result = await livro.findAll();
  return res.status(200).json(result);
});

//pegar um livro
server.get(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    let livro = new Livro();
    livro.codigo = codigo;

    let result = livro.findOneById;

    if (result.length > 0) {
      return res.status(200).json(result);
    }

    let erro = { erro: "Livro não encontrado." };

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
    livro.qtpaginas = req.body.qtpaginas;
    livro.emprestado = req.body.emprestado;
    livro.idcategoria = req.body.idcategoria;

    let result = await livro.save();

    return res.status(200).json(result);
  }
);

//editar livro
server.put(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);
    let livro = new Livro();

    if (codigo > 0) {
      let livro: Livro = new Livro();
      livro.codigo = codigo;
      livro.titulo = req.body.titulo;
      livro.autor = req.body.autor;
      livro.qtpaginas = req.body.qtpaginas;

      let result = await livro.save();

      return res.status(200).json(result);
    }

    let erro = { erro: "Livro não encontrado." };

    return res.status(400).json(erro);
  }
);

server.delete(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);
    let livro = new Livro();
    livro.codigo = codigo;

    if (codigo > 0) {
      let result = await livro.delete();
      return res.status(200).json("Ok");
    }

    let erro = { erro: "Livro não encontrado." };

    return res.status(400).json(erro);
  }
);

server.get(
  "/livro/:codigo/emprestar",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);
    let livro = new Livro();
    livro.codigo = codigo;

    let livroEspecifico = await livro.findOneById();

    if (!livroEspecifico?.titulo) {
      let erro = { erro: "Livro não encontrado." };

      return res.status(400).json(erro);
    }

    if (livroEspecifico?.emprestado == true) {
      let erro = {
        codigo: codigo,
        erro: "Livro já emprestado.",
      };

      return res.status(400).json(erro);
    }

    let sql = "UPDATE livros SET emprestado = true WHERE codigo = $1;";
    let resultado = await dbQuery(sql, [codigo]);
    livro.emprestado = true;

    return res.status(200).json(livro);
  }
);

server.get(
  "/livro/:codigo/devolver",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);
    let livro = new Livro();
    livro.codigo = codigo;
    let livroEspecifico = await livro.findOneById();

    if (!livroEspecifico?.titulo) {
      let erro = { erro: "Livro não encontrado." };

      return res.status(400).json(erro);
    }

    if (livroEspecifico?.emprestado == false) {
      let erro = {
        codigo: codigo,
        erro: "Livro não esta emprestado.",
      };

      return res.status(400).json(erro);
    }

    let sql = "UPDATE livros SET emprestado = false WHERE codigo = $1;";
    let resultado = await dbQuery(sql, [codigo]);
    livro.emprestado = true;

    return res.status(200).json(livro);
  }
);

// Listar todas as categorias
server.get(
  "/categoriaAll",
  async (req: Request, res: Response): Promise<Response> => {
    let categoria = new Categoria();
    let result = await categoria.findAllOnlyCategories();
    return res.status(200).json(result);
  }
);

// Pegar uma cateria especifica
server.get(
  "/categoria/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    let categoria = new Categoria();
    categoria.codigo = codigo;

    let result = await categoria.findOneById();

    if (result !== null) {
      return res.status(200).json(result);
    }

    let erro = { erro: "Categoria não encontrada." };

    return res.status(400).json(erro);
  }
);

// Gravar categoria
server.post(
  "/categoria",
  async (req: Request, res: Response): Promise<Response> => {
    let categoria = new Categoria();
    categoria.name = req.body.name;

    let result = await categoria.save();

    if (result !== null) {
      return res.status(200).json(result);
    }

    let erro = { erro: "Erro ao salvar uma categoria." };

    return res.status(400).json(erro);
  }
);

// Editar livro
server.put(
  "/categoria/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    if (codigo > 0) {
      let categoria: Categoria = new Categoria();
      categoria.codigo = codigo;
      categoria.name = req.body.name;

      let result = await categoria.save();

      if (result !== null) {
        return res.status(200).json(result);
      }
      let erro = { erro: "Erro ao salvar a categoria editada." };

      return res.status(400).json(erro);
    }

    let erro = { erro: "Categoria não encontrada." };

    return res.status(400).json(erro);
  }
);

server.delete(
  "/categoria/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);
    let categoria = new Categoria();
    categoria.codigo = codigo;

    if (codigo > 0) {
      let result = await categoria.delete();

      // Check for different cases based on the result returned from delete()
      if (result?.message === "Deletado com sucesso!") {
        // Success case
        return res.status(200).json({ message: result.message });
      } else if (result?.typeError === "RelatedToAnotherTable_error") {
        // Foreign key constraint error (related to books)
        return res.status(400).json({ erro: result.message });
      } else if (result?.typeError === "NotFinded_error") {
        // Category not found case
        return res.status(404).json({ erro: result.message });
      }

      // Fallback error in case none of the expected cases match
      return res
        .status(500)
        .json({ erro: "Erro desconhecido ao deletar categoria." });
    }

    // Input validation failure
    return res.status(400).json({ erro: "Digite um codigo acima de 0." });
  }
);

const serverInstance = server.listen(port, () => {});

// Graceful shutdown
const gracefulShutdown = () => {
  serverInstance.close(() => {
    client.end();
    process.exit(0);
  });
};

// Handle termination signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
