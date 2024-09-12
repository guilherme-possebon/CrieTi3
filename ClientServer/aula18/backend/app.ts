//npm install express
//npm install @types/express
//npm install cors
//npm install @types/cors
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Livro } from "./livro";
import { client, dbQuery } from "./database";

const port: Number = 3000;
let server: Express = express();

server.use(cors());
server.use(express.json());

async function pegarLivro(id: number) {
  let sql = "SELECT * FROM livro WHERE id = $1 LIMIT 1;";
  let resultado = await dbQuery(sql, [id]);

  if (resultado.length > 0) {
    console.log(resultado[0]);
    return resultado[0];
  }

  return null;
}

server.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json("Olá, mundo!");
});

server.get("/livro", async (req: Request, res: Response): Promise<Response> => {
  let sql = "select * from livro order by codigo";
  let result = await dbQuery(sql);
  return res.status(200).json(result);
});

//pegar um livro
server.get(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);
    let sql = "select * from livro where codigo = $1";
    let result = await dbQuery(sql, [codigo]);

    if (result.length > 0) {
      return res.status(200).json(result);
    }

    let erro = { codigo: codigo, erro: "Livro não encontrado." };

    return res.status(400).json(erro);
  }
);

//gravar livro
server.post(
  "/livro",
  async (req: Request, res: Response): Promise<Response> => {
    let sql =
      "insert into livro (titulo, autor, qtpaginas, emprestado) values ($1, $2, $3, $4)";

    let livro = new Livro();
    livro.titulo = req.body.titulo;
    livro.autor = req.body.autor;
    livro.qtpaginas = req.body.qtpaginas;
    let result = await dbQuery(sql, [
      livro.titulo,
      livro.autor,
      livro.qtpaginas,
      false,
    ]);

    return res.status(200).json("Ok");
  }
);

//editar livro
server.put(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    let sql =
      "update livro set titulo = $2, autor = $3, qtpaginas = $4 where codigo = $1";

    if (codigo > 0) {
      let livro: Livro = new Livro();
      livro.codigo = codigo;
      livro.titulo = req.body.titulo;
      livro.autor = req.body.autor;
      livro.qtpaginas = req.body.qtpaginas;

      await dbQuery(sql, [
        livro.codigo,
        livro.titulo,
        livro.autor,
        livro.qtpaginas,
      ]);

      return res.status(200).json("Ok");
    }

    let erro = { codigo: codigo, erro: "Livro não encontrado." };

    return res.status(400).json(erro);
  }
);

server.delete(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    let sql = "delete from livro where codigo = $1";

    if (codigo > 0) {
      await dbQuery(sql, [codigo]);
      return res.status(200).json("Ok");
    }

    let erro = { codigo: codigo, erro: "Livro não encontrado." };

    return res.status(400).json(erro);
  }
);

server.get(
  "/livro/:codigo/emprestar",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);

    let livro = await pegarLivro(codigo);

    if (!livro.titulo) {
      let erro = { codigo: codigo, erro: "Livro não encontrado." };

      return res.status(400).json(erro);
    }

    if (livro.emprestado == true) {
      let erro = {
        codigo: codigo,
        erro: "Livro já emprestado.",
      };

      return res.status(400).json(erro);
    }

    let sql = "UPDATE livro SET emprestado = true WHERE id = $1;";
    let resultado = await dbQuery(sql, [codigo]);
    livro.emprestado = true;

    return res.status(200).json(livro);
  }
);

server.get(
  "/livro/:codigo/devolver",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);
    let livro = await pegarLivro(codigo);

    if (!livro.titulo) {
      let erro = { codigo: codigo, erro: "Livro não encontrado." };

      return res.status(400).json(erro);
    }

    if (livro.emprestado == false) {
      let erro = {
        codigo: codigo,
        erro: "Livro não esta emprestado.",
      };

      return res.status(400).json(erro);
    }

    let sql = "UPDATE livro SET emprestado = false WHERE id = $1;";
    let resultado = await dbQuery(sql, [codigo]);
    livro.emprestado = true;

    return res.status(200).json(livro);
  }
);

const serverInstance = server.listen(port, () => {
  console.log("Server iniciado na porta " + port);
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("\nServer is closing...");
  serverInstance.close(() => {
    console.log("Server closed successfully");
    client.end();
    process.exit(0);
  });
};

// Handle termination signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
