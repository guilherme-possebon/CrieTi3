import express, { Express, Request, Response } from "express";
import cors from "cors";
import { FormaPagamento } from "./FormaPagamento";
import { Usuario } from "./Usuario";
import { dbQuery, client } from "./database";
import { UnidadeMedida } from "./UnidadeMedida";

const port: Number = 3000;
let server: Express = express();

server.use(cors());
server.use(express.json());

let success = {
  insert: "Dado inserido com sucesso!",
  update: "Dado atualizado com sucesso!",
  delete: "Dado deletado com sucesso!",
};

// NOTE <-- Forma de pagamento -->

// NOTE Criar formas de pagamento
server.post(
  "/formaDePagamento",
  async (req: Request, res: Response): Promise<Response> => {
    let formaPagamento = new FormaPagamento();
    let sql = "INSERT INTO forma_de_pagamento (name) VALUES ($1) ";

    formaPagamento.name = req.body.name;

    let result = await dbQuery(sql, [formaPagamento.name]);

    return res.status(200).json(success.insert);
  }
);

// NOTE Listar formas de pagamento
server.get(
  "/formaDePagamento",
  async (req: Request, res: Response): Promise<Response> => {
    let sql = "SELECT * FROM forma_de_pagamento order by id";
    let result = await dbQuery(sql);
    return res.status(200).json(result);
  }
);

// NOTE Pegar uma forma de pagamento
server.get(
  "/formaDePagamento/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let sql = "SELECT * FROM forma_de_pagamento WHERE id = $1";

    if (id > 0) {
      let result = await dbQuery(sql, [id]);
      return res.status(200).json(result[0]);
    }
    let erro = {
      erro: "Não foi possivel encontrar a forma de pagamento",
    };
    return res.status(400).json(erro);
  }
);

// NOTE Editar forma de pagamento
server.put(
  "/formaDePagamento/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);

    let sql = "UPDATE forma_de_pagamento SET name = $2 WHERE id = $1";
    let formaPagamento: FormaPagamento = new FormaPagamento();

    formaPagamento.name = req.body.name;

    if (
      id > 0 &&
      formaPagamento.name.length > 0 &&
      formaPagamento.name.length <= 2
    ) {
      let result = await dbQuery(sql, [id, formaPagamento.name]);

      return res.status(200).json(success.update);
    }
    let erro = {
      erro: "Não foi possivel encontrar a forma de pagamento",
    };
    return res.status(400).json(erro);
  }
);

// NOTE Deletar forma de pagamento
server.delete(
  "/formaDePagamento/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);

    let sql = "DELETE FROM forma_de_pagamento WHERE id = $1";

    if (id > 0) {
      let result = await dbQuery(sql, [id]);
      return res.status(200).json(success.delete);
    }
    let erro = {
      erro: "Não foi possivel encontrar a forma de pagamento",
    };
    return res.status(400).json(erro);
  }
);

// NOTE <-- Usuario -->

// NOTE Validar usuario de adm
server.post(
  "/usersADM",
  async (req: Request, res: Response): Promise<Response> => {
    let usuario = new Usuario();

    usuario.username = req.body.username;
    usuario.password = req.body.password;

    console.log(usuario.username);
    console.log(usuario.password);

    let sql =
      "SELECT * FROM users WHERE username = $1 AND password = crypt($2, password)";

    if (usuario.username.length > 0 && usuario.password.length > 0) {
      let result = await dbQuery(sql, [usuario.username, usuario.password]);
      console.log(result);
      if (result.length == 0) {
        let erro = {
          erro: "Usuário ou senha estão incorretos!",
        };
        return res.status(400).json(erro);
      }
      let confirm = {
        confirm: "Login efetuado com sucesso!",
      };
      return res.status(200).json(confirm);
    }
    let erro = {
      erro: "Um dos campos estão vazios, verifique novamente!",
    };
    return res.status(400).json(erro);
  }
);

// NOTE <-- Unidade de medida -->

// NOTE Listar unidades de medida
server.get(
  "/unidademedida",
  async (req: Request, res: Response): Promise<Response> => {
    let sql = "SELECT * FROM unidade_medida order by id";
    let result = await dbQuery(sql);
    return res.status(200).json(result);
  }
);

// NOTE Pegar uma unidade de medida
server.get(
  "/unidademedida/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let sql = "SELECT * FROM unidade_medida where id = $1";

    if (id > 0) {
      let result = await dbQuery(sql, [id]);
      return res.status(200).json(result[0]);
    }

    let erro = {
      erro: "Não foi possivel encontrar a unidade de medida",
    };
    return res.status(400).json(erro);
  }
);

// NOTE Criar unidade de medida
server.post(
  "/unidademedida",
  async (req: Request, res: Response): Promise<Response> => {
    let unidade: UnidadeMedida = new UnidadeMedida();
    unidade.name = req.body.name;

    let sql = "INSERT INTO unidade_medida (name) VALUES ($1)";
    if (unidade.name.length > 0 && unidade.name.length <= 2) {
      let result = await dbQuery(sql, [unidade.name]);
      return res.status(200).json(success.insert);
    }
    let erro = {
      erro: "Insira um valor de no máximo 2 letras!",
    };
    return res.status(400).json(erro);
  }
);

// NOTE Atualizar unidade de medida
server.put(
  "/unidademedida/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);
    let unidade: UnidadeMedida = new UnidadeMedida();
    unidade.name = req.body.name;

    let sql = "UPDATE unidade_medida SET name= $2 WHERE id = $1";

    if (id > 0 && unidade.name.length > 0 && unidade.name.length <= 2) {
      let result = await dbQuery(sql, [id, unidade.name]);
      return res.status(200).json(success.update);
    } else if (unidade.name.length > 2) {
      let erro = {
        erro: "Insira um valor de no máximo 2 letras!",
      };
      return res.status(400).json(erro);
    }

    let erro = {
      erro: "Não foi possivel encontrar a unidade de medida",
    };
    return res.status(400).json(erro);
  }
);

// NOTE Deletar unidade de medida
server.delete(
  "/unidademedida/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let id = Number(req.params.id);

    let sql = "DELETE FROM unidade_medida WHERE id = $1";

    if (id > 0) {
      let result = await dbQuery(sql, [id]);
      return res.status(200).json(success.delete);
    }

    let erro = {
      erro: "Não foi possivel encontrar a unidade de medida",
    };
    return res.status(400).json(erro);
  }
);

// NOTE <-- Servidor (não mexer) -->

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
