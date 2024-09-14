import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Pessoa } from "./Pessoa";
import { Viagem } from "./Viagem";
import { client, dbQuery } from "./database";

let port = 3000;

let server: Express = express();

server.use(cors());
server.use(express.json());

// NOTE Listar pessoas
server.get(
  "/pessoa",
  async (req: Request, res: Response): Promise<Response> => {
    let sql = "select * from pessoas order by id";
    let result = await dbQuery(sql);
    return res.status(200).json(result);
  }
);

// NOTE Pegar um pessoa
server.get(
  "/pessoa/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id: number = Number(req.params.id);

    if (id > 0) {
      let sql = "SELECT * FROM pessoas WHERE id = $1 LIMIT 1;";
      let result = await dbQuery(sql, [id]);
      return res.status(200).json(result);
    }

    let erro = {
      id: id,
      erro: "Id da pessoa não foi encontrada.   ",
    };

    return res.status(400).json(erro);
  }
);

// NOTE Criar pessoa
server.post(
  "/pessoa",
  async (req: Request, res: Response): Promise<Response> => {
    let pessoa: Pessoa = new Pessoa();

    let sql =
      "insert into pessoas (nome, cpf, idade, siglauf, cidade) values ($1, $2, $3, $4, $5)";

    pessoa.nome = req.body.nome;
    pessoa.cpf = req.body.cpf;
    pessoa.idade = req.body.idade;
    pessoa.siglauf = req.body.siglauf;
    pessoa.cidade = req.body.cidade;

    let result = await dbQuery(sql, [
      pessoa.nome,
      pessoa.cpf,
      pessoa.idade,
      pessoa.siglauf,
      pessoa.cidade,
    ]);

    return res.status(200).json("Ok");
  }
);

// NOTE Editar uma pessoa
server.put(
  "/pessoa/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id: number = Number(req.params.id);

    let sql =
      "update pessoas set nome = $2, cpf = $3, idade = $4, siglauf = $5, cidade = $6 where id = %1 ";

    if (id > 0) {
      let pessoa: Pessoa = new Pessoa();

      pessoa.nome = req.body.nome;
      pessoa.cpf = req.body.cpf;
      pessoa.idade = req.body.idade;
      pessoa.cidade = req.body.cidade;
      pessoa.siglauf = req.body.siglauf;

      let result = await dbQuery(sql, [
        pessoa.id,
        pessoa.nome,
        pessoa.cpf,
        pessoa.idade,
        pessoa.siglauf,
        pessoa.cidade,
      ]);

      return res.status(200).json("Ok");
    }

    let erro = {
      id: id,
      erro: "Id da pessoa não foi encontrada.",
    };

    return res.status(400).json(erro);
  }
);

// NOTE Deletar uma pessoa
server.delete(
  "/pessoa/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id: number = Number(req.params.id);

    let sqlPessoa = "delete from pessoas where id = $1";
    let sqlViagem = "delete from viagens where idpessoa = $1";

    if (id > 0) {
      let resultViagem = await dbQuery(sqlViagem, [id]);
      let resultPessoa = await dbQuery(sqlPessoa, [id]);
      return res.status(200).json("Ok");
    }

    let erro = {
      id: id,
      erro: "Id da pessoa não foi encontrada.",
    };

    return res.status(400).json(erro);
  }
);

// NOTE Listar viagens
server.get(
  "/pessoa/:id/viagens",
  async (req: Request, res: Response): Promise<Response> => {
    let sql = "select * from viagens order by id";
    let result = await dbQuery(sql);
    return res.status(200).json(result);
  }
);

// NOTE Adicionar uma viagem
server.post(
  "/pessoa/:id/adicionarviagem",
  async (req: Request, res: Response): Promise<Response> => {
    let id: number = Number(req.params.id);
    let viagem: Viagem = new Viagem();

    let sql =
      "insert into viagens (idpessoa, destino, datahorapartida, datahorachegada) values ($1, $2, $3, $4)";

    try {
      if (id > 0) {
        viagem.id = viagem.idPessoa = id;
        viagem.destino = req.body.destino;
        if (
          req.body.datahorapartida === null ||
          req.body.datahorachegada === null
        ) {
          let erro = {
            erro: "Formato de data está errado, tente encaixar nesse formato: YYYY-MM-DDTHH:MM:SSZ",
          };
          return res.status(400).json(erro);
        } else {
          viagem.datahorapartida = new Date(req.body.datahorapartida);
          viagem.datahorachegada = new Date(req.body.datahorachegada);
        }

        let result = await dbQuery(sql, [
          viagem.idPessoa,
          viagem.destino,
          viagem.datahorapartida,
          viagem.datahorachegada,
        ]);

        return res.status(200).json("Ok");
      }
    } catch (error) {
      let erro = {
        erro: "Verifique o id da pessoa!",
      };
      return res.status(400).json(erro);
    }

    let erro = {
      id: id,
      erro: "Id da pessoa não foi encontrada.",
    };

    return res.status(400).json(erro);
  }
);

// NOTE Remover uma viagem
server.delete(
  "/pessoa/:idpessoa/removerviagem/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let idpessoa: number = Number(req.params.idpessoa);
    let id: number = Number(req.params.id);
    console.log(idpessoa, "id pessoa");
    console.log(id, "id viagem");
    let sql = "delete from viagens where id = $1";

    if (idpessoa > 0) {
      if (id > 0) {
        let result = await dbQuery(sql, [id]);
        return res.status(200).json("Ok");
      }
      let erro = {
        id: id,
        erro: "Posição da viagem não foi encontrada.",
      };

      return res.status(400).json(erro);
    }

    let erro = {
      id: idpessoa,
      erro: "Id da pessoa não foi encontrada.",
    };

    return res.status(400).json(erro);
  }
);

const serverInstance = server.listen(port, () => {
  console.log("Server iniciado na porta " + port);
});

const gracefulShutdown = () => {
  console.log("\nServer is closing...");
  serverInstance.close(() => {
    console.log("Server closed successfully");
    client.end();
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
