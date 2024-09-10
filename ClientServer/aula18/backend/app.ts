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

// let livros: Livro[] = [];

server.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json("Olá, mundo!");
});

server.get("/livro", async (req: Request, res: Response): Promise<Response> => {
  let sql = "select * from livro order by codigo";
  let result = await dbQuery(sql);
  console.log(result, "select *");
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
      console.log(result, "get one");
      return res.status(200).json(result[0]);
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

    console.log(sql, "Insert");
    return res.status(200).json(sql);
  }
);

//editar livro
server.put(
  "/livro/:codigo",
  async (req: Request, res: Response): Promise<Response> => {
    let codigo = Number(req.params.codigo);
    console.log(codigo);

    let sql =
      "update livro set titulo = $2, autor = $3, qtpaginas = $4 where codigo = $1";

    if (codigo > 0) {
      let livro: Livro = new Livro();
      livro.codigo = codigo;
      livro.titulo = req.body.titulo;
      livro.autor = req.body.autor;
      livro.qtpaginas = req.body.qtpaginas;

      console.log(livro);

      await dbQuery(sql, [
        livro.codigo,
        livro.titulo,
        livro.autor,
        livro.qtpaginas,
      ]);

      console.log(sql, "update");

      return res.status(200).json(sql);
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
      return res.status(200).json(sql);
    }

    let erro = { codigo: codigo, erro: "Livro não encontrado." };

    return res.status(400).json(erro);
  }
);

// server.get(
//   "/livro/:codigo/emprestar",
//   async (req: Request, res: Response): Promise<Response> => {
//     let codigo = Number(req.params.codigo);

//     if (codigo >= 0 && codigo < livros.length) {
//       let livro = livros[codigo];

//       if (livro.emprestado == true) {
//         let erro = {
//           codigo: codigo,
//           erro: "Livro já emprestado.",
//         };

//         return res.status(400).json(erro);
//       } else {
//         livro.emprestado = true;
//       }

//       return res.status(200).json(livro);
//     }

//     let erro = { codigo: codigo, erro: "Livro não encontrado." };

//     return res.status(400).json(erro);
//   }
// );

// server.get(
//   "/livro/:codigo/devolver",
//   async (req: Request, res: Response): Promise<Response> => {
//     let codigo = Number(req.params.codigo);

//     if (codigo >= 0 && codigo < livros.length) {
//       let livro = livros[codigo];

//       if (livro.emprestado == false) {
//         let erro = {
//           codigo: codigo,
//           erro: "Livro não esta emprestado.",
//         };

//         return res.status(400).json(erro);
//       } else {
//         livro.emprestado = false;
//       }

//       return res.status(200).json(livro);
//     }

//     let erro = { codigo: codigo, erro: "Livro não encontrado." };

//     return res.status(400).json(erro);
//   }
// );

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
